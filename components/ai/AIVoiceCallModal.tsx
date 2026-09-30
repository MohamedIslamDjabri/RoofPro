'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@/context/LocationContext';
import { SITE_CONFIG } from '@/constants/data';

interface AIVoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export default function AIVoiceCallModal({ isOpen, onClose, onOpenChat }: AIVoiceCallModalProps) {
  const { currentLocation } = useLocation();

  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'speaking' | 'listening' | 'processing' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<{ sender: 'agent' | 'user'; text: string }[]>([]);
  const [lastAgentMessage, setLastAgentMessage] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<{
    confirmed: boolean;
    fullName?: string;
    phone?: string;
    city?: string;
    address?: string;
    service?: string;
    preferredTime?: string;
  } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [manualInput, setManualInput] = useState('');

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Convert AI text to speech and play via audio element
  const speakAgentResponse = async (text: string) => {
    setCallStatus('speaking');
    try {
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'Kore' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
          }
          const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
          audioPlayerRef.current = audio;
          audio.onended = () => {
            setCallStatus('connected');
          };
          audio.onerror = () => {
            setCallStatus('connected');
          };
          await audio.play();
          return;
        }
      }

      // Fallback to browser speech synthesis if TTS endpoint doesn't return audio
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setCallStatus('connected');
        utterance.onerror = () => setCallStatus('connected');
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setCallStatus('connected'), 2500);
      }
    } catch {
      setCallStatus('connected');
    }
  };

  // Process user voice input through the booking agent
  const handleUserVoiceInput = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    setTranscript((prev) => [...prev, { sender: 'user', text: spokenText }]);
    setCallStatus('processing');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...transcript.map((t) => ({
              role: t.sender === 'user' ? 'user' : 'assistant',
              content: t.text,
            })),
            { role: 'user', content: spokenText },
          ],
          userLocation: `${currentLocation.displayName}, TX`,
        }),
      });

      const data = await response.json();
      const botReply = data.text || "I've noted that down. Could I get your property street address?";

      setLastAgentMessage(botReply);
      setTranscript((prev) => [...prev, { sender: 'agent', text: botReply }]);

      if (data.booking && data.booking.confirmed) {
        setConfirmedBooking(data.booking);
      }

      speakAgentResponse(botReply);
    } catch (err) {
      console.error('Call processing error:', err);
      const errorMsg = `Thank you for sharing that. I'm connecting you with our ${currentLocation.city} project manager at ${currentLocation.phone}.`;
      setLastAgentMessage(errorMsg);
      speakAgentResponse(errorMsg);
    }
  };

  // Initial welcome greeting when call connects
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioPlayerRef.current) audioPlayerRef.current.pause();
      if (recognitionRef.current) recognitionRef.current.stop();
      return;
    }

    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
      const initialGreeting = `Hello! Thank you for calling RoofPro USA dispatch. I can schedule your complimentary 21-point drone and attic roof inspection in ${currentLocation.city} or anywhere in Texas. What can we help you inspect today?`;

      setLastAgentMessage(initialGreeting);
      setTranscript([{ sender: 'agent', text: initialGreeting }]);
      speakAgentResponse(initialGreeting);

      // Start call timer
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }, 1200);

    return () => {
      clearTimeout(connectTimer);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioPlayerRef.current) audioPlayerRef.current.pause();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [isOpen, currentLocation.city]);

  // Speech Recognition setup (Web Speech API)
  const startListening = () => {
    if (isMuted) return;

    const SpeechRecognition = typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsRecording(true);
          setCallStatus('listening');
        };

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          if (spokenText) {
            handleUserVoiceInput(spokenText);
          }
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setCallStatus('connected');
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      }
    } else {
      setIsRecording(true);
      setCallStatus('listening');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setCallStatus('connected');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) recognitionRef.current.stop();
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
      setCallDuration(0);
      setConfirmedBooking(null);
      setTranscript([]);
      setCallStatus('connecting');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/60 flex flex-col">
        {/* Caller ID Header */}
        <div className="bg-primary-container text-on-primary p-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-lowest/15 text-on-primary transition-colors cursor-pointer"
            aria-label="Close call modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-label-caps mb-3">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>RoofPro AI Voice Dispatch</span>
          </div>

          <h3 className="font-headline-md text-xl md:text-2xl font-bold text-on-primary">
            Texas Hub Regional Booking Line
          </h3>
          <p className="text-xs text-primary-fixed-dim mt-0.5">
            {SITE_CONFIG.phone} • Serving {currentLocation.displayName}
          </p>

          <div className="mt-3 font-mono text-sm font-bold text-tertiary-fixed-dim">
            {callStatus === 'connecting' ? 'Connecting to Dispatch...' : formatTimer(callDuration)}
          </div>
        </div>

        {/* Visualizer & Agent Presence Area */}
        <div className="p-6 md:p-8 bg-surface flex flex-col items-center justify-center space-y-6">
          {/* Animated Waveform / Audio State Ring */}
          <div className="relative flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                callStatus === 'speaking'
                  ? 'bg-secondary/20 ring-8 ring-secondary/30 scale-105'
                  : callStatus === 'listening'
                  ? 'bg-tertiary-fixed/30 ring-8 ring-tertiary-fixed-dim/40 scale-105'
                  : 'bg-surface-container ring-4 ring-outline-variant/30'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-primary-container text-tertiary-fixed-dim flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[38px]">
                  {callStatus === 'speaking'
                    ? 'graphic_eq'
                    : callStatus === 'listening'
                    ? 'mic'
                    : 'support_agent'}
                </span>
              </div>
            </div>

            {/* Audio Wave Bars Animation when speaking */}
            {callStatus === 'speaking' && (
              <div className="absolute -bottom-3 flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-tertiary-fixed-dim shadow text-xs">
                <span className="w-1 h-3 bg-tertiary-fixed-dim animate-bounce"></span>
                <span className="w-1 h-5 bg-tertiary-fixed-dim animate-bounce delay-100"></span>
                <span className="w-1 h-2 bg-tertiary-fixed-dim animate-bounce delay-200"></span>
                <span className="w-1 h-4 bg-tertiary-fixed-dim animate-bounce delay-150"></span>
                <span className="text-[10px] font-bold ml-1">RoofPro Agent Speaking</span>
              </div>
            )}

            {callStatus === 'listening' && (
              <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-secondary text-on-secondary shadow text-[10px] font-bold animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span>Listening to You...</span>
              </div>
            )}
          </div>

          {/* Current Spoken Message Display */}
          <div className="w-full p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm text-center min-h-[90px] flex items-center justify-center">
            <p className="text-sm font-medium text-on-surface leading-relaxed italic">
              &ldquo;{lastAgentMessage || 'Connecting to RoofPro automated voice booking line...'}&rdquo;
            </p>
          </div>

          {/* Confirmed Booking Alert Card */}
          {confirmedBooking && (
            <div className="w-full p-4 rounded-xl bg-secondary-container/50 border border-secondary text-left space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Inspection Confirmed Over Call!</span>
              </div>
              <p className="text-xs text-on-surface">
                <strong>Location:</strong> {confirmedBooking.address || currentLocation.city}
              </p>
              <p className="text-xs text-on-surface">
                <strong>Service:</strong> {confirmedBooking.service || 'Free 21-Point Drone Inspection'}
              </p>
              <p className="text-[11px] text-on-surface-variant pt-1 border-t border-secondary/30">
                A confirmation SMS will be dispatched to your phone number shortly.
              </p>
            </div>
          )}

          {/* Quick Voice Prompt / Tap to Talk Action */}
          <div className="w-full space-y-3">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={isRecording ? stopListening : startListening}
                className={`w-full py-3.5 px-6 rounded-xl font-label-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isRecording
                    ? 'bg-error text-on-error animate-pulse'
                    : 'bg-primary-container hover:bg-primary text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isRecording ? 'stop_circle' : 'mic'}
                </span>
                <span>{isRecording ? 'Tap When Finished Speaking' : 'Push to Talk to Dispatcher'}</span>
              </button>
            </div>

            {/* Quick response buttons in case microphone is unavailable */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                `Schedule inspection in ${currentLocation.city}`,
                'I have roof hail damage',
                'What is the price of reroofing?',
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUserVoiceInput(suggestion)}
                  className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-primary-container transition-colors cursor-pointer"
                >
                  &ldquo;{suggestion}&rdquo;
                </button>
              ))}
            </div>

            {/* Text input fallback inside call */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Or type what you would like to say to the agent..."
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (manualInput.trim()) {
                      handleUserVoiceInput(manualInput);
                      setManualInput('');
                    }
                  }
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button
                type="button"
                onClick={() => {
                  if (manualInput.trim()) {
                    handleUserVoiceInput(manualInput);
                    setManualInput('');
                  }
                }}
                className="px-3 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs cursor-pointer hover:bg-secondary/90 transition-colors"
              >
                Speak
              </button>
            </div>
          </div>
        </div>

        {/* Call Controls Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMuted
                ? 'bg-error/15 text-error ring-1 ring-error'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          {/* End Call Button */}
          <button
            type="button"
            onClick={handleEndCall}
            className="px-8 py-3 rounded-full bg-error hover:bg-error/90 text-on-error font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">call_end</span>
            <span>End Call</span>
          </button>

          {/* Switch to Chat Button */}
          <button
            type="button"
            onClick={() => {
              handleEndCall();
              onOpenChat();
            }}
            className="p-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
            title="Switch to Text Chat"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
