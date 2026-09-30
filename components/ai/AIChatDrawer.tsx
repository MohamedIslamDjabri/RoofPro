'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { SITE_CONFIG } from '@/constants/data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  booking?: {
    confirmed: boolean;
    fullName?: string;
    phone?: string;
    city?: string;
    address?: string;
    service?: string;
    preferredTime?: string;
    dispatchHub?: string;
  } | null;
  audioUrl?: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVoiceCall: () => void;
}

export default function AIChatDrawer({ isOpen, onClose, onOpenVoiceCall }: AIChatDrawerProps) {
  const { currentLocation } = useLocation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I'm your RoofPro USA Booking Specialist. I can answer questions about our roofing services and schedule your free 21-point drone and attic inspection in ${currentLocation.city} or anywhere across Texas. How can I help you today?`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const counterRef = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    `Book free drone inspection in ${currentLocation.city}`,
    'How does your hail insurance claim process work?',
    'What does a full roof replacement cost?',
    'Do you offer emergency leak tarping?',
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const nextId = counterRef.current++;
    const userMessage: Message = {
      id: `msg-user-${nextId}`,
      role: 'user',
      content: userText,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          userLocation: `${currentLocation.displayName}, TX`,
        }),
      });

      const data = await response.json();

      let replyContent = data.text;
      if (!replyContent) {
        replyContent = data.fallbackText || 'I am having trouble connecting to dispatch. Please call (800) 555-ROOF.';
      }

      const botMessage: Message = {
        id: `msg-bot-${counterRef.current++}`,
        role: 'assistant',
        content: replyContent,
        booking: data.booking,
      };

      setMessages((prev) => [...prev, botMessage]);

      // If audio narration is enabled, generate speech via TTS
      if (audioEnabled && replyContent) {
        playTTS(replyContent);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${counterRef.current++}`,
          role: 'assistant',
          content: `I'm sorry, I couldn't reach the dispatch server right now. You can call our ${currentLocation.city} hub directly at ${currentLocation.phone} or try again in a moment.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const playTTS = async (text: string) => {
    try {
      setIsPlayingAudio(true);
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
          audio.onended = () => setIsPlayingAudio(false);
          audio.onerror = () => setIsPlayingAudio(false);
          await audio.play();
          return;
        }
      }
      setIsPlayingAudio(false);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-primary/40 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-outline-variant/60 animate-slideLeft">
        {/* Drawer Header */}
        <div className="bg-primary-container text-on-primary p-4 flex items-center justify-between border-b border-primary-fixed-variant/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px] text-secondary">smart_toy</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-tertiary-fixed-dim border-2 border-primary-container"></span>
            </div>
            <div>
              <div className="font-title-md text-sm font-bold text-on-primary flex items-center gap-1.5">
                <span>RoofPro AI Dispatch</span>
                <span className="px-1.5 py-0.2 rounded bg-secondary/30 text-[10px] text-secondary-fixed font-bold uppercase">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-primary-fixed-dim">
                Connected to {currentLocation.displayName} Hub
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Switch to Voice Call */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenVoiceCall();
              }}
              title="Switch to AI Voice Call"
              className="p-2 rounded-lg bg-surface-container-lowest/15 hover:bg-tertiary-fixed-dim hover:text-on-tertiary-fixed transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              <span className="hidden sm:inline">Voice Call</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-container-lowest/10 text-on-primary transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Audio narration toggle banner */}
        <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isPlayingAudio ? 'volume_up' : 'campaign'}
            </span>
            <span>AI Voice Narration:</span>
          </div>
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-2 py-0.5 rounded font-bold text-[11px] transition-colors cursor-pointer ${
              audioEnabled
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {audioEnabled ? 'Active (Kore)' : 'Muted'}
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-primary-container text-on-primary rounded-br-none shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface rounded-bl-none shadow-sm border border-outline-variant/40'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Booking Confirmation Card */}
                  {msg.booking && msg.booking.confirmed && (
                    <div className="mt-3 p-3.5 rounded-xl bg-secondary-container/40 border border-secondary/50 text-on-surface space-y-2">
                      <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Inspection Scheduled!</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>
                          <strong>Client:</strong> {msg.booking.fullName || 'Registered Homeowner'}
                        </div>
                        {msg.booking.city && (
                          <div>
                            <strong>Service Hub:</strong> {msg.booking.city} Hub
                          </div>
                        )}
                        {msg.booking.address && (
                          <div>
                            <strong>Location:</strong> {msg.booking.address}
                          </div>
                        )}
                        {msg.booking.service && (
                          <div>
                            <strong>Requested Service:</strong> {msg.booking.service}
                          </div>
                        )}
                        {msg.booking.preferredTime && (
                          <div>
                            <strong>Inspection Slot:</strong> {msg.booking.preferredTime}
                          </div>
                        )}
                      </div>
                      <div className="pt-1.5 border-t border-secondary/30 text-[11px] text-on-surface-variant">
                        Reference Code: <strong className="text-primary-container">RP-TX-7842</strong>
                      </div>
                    </div>
                  )}
                </div>

                {!isUser && (
                  <button
                    type="button"
                    onClick={() => playTTS(msg.content)}
                    className="mt-1 text-[11px] text-on-surface-variant hover:text-secondary flex items-center gap-1 pl-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">volume_up</span>
                    <span>Read aloud</span>
                  </button>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-surface-container-lowest text-on-surface-variant text-xs shadow-sm w-fit border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-200"></span>
              <span>RoofPro Dispatcher is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-surface-container-low border-t border-outline-variant/30 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary border border-outline-variant/40 text-[11px] font-semibold text-primary-container transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about inspections, hail damage, or bookings..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-surface-container text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-lg bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-bold disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer shadow"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
          <div className="text-[10px] text-center text-on-surface-variant mt-1.5">
            Powered by Gemini AI • Direct booking into Texas regional hubs
          </div>
        </div>
      </div>
    </div>
  );
}
