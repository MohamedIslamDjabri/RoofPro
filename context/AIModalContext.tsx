'use client';

import React, { createContext, useContext, useState } from 'react';
import AIChatDrawer from '@/components/ai/AIChatDrawer';
import AIVoiceCallModal from '@/components/ai/AIVoiceCallModal';

interface AIModalContextType {
  openChat: () => void;
  closeChat: () => void;
  openVoiceCall: () => void;
  closeVoiceCall: () => void;
  isChatOpen: boolean;
  isVoiceCallOpen: boolean;
}

const AIModalContext = createContext<AIModalContextType | undefined>(undefined);

export function AIModalProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);

  const openChat = () => {
    setIsVoiceCallOpen(false);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openVoiceCall = () => {
    setIsChatOpen(false);
    setIsVoiceCallOpen(true);
  };

  const closeVoiceCall = () => {
    setIsVoiceCallOpen(false);
  };

  return (
    <AIModalContext.Provider
      value={{
        openChat,
        closeChat,
        openVoiceCall,
        closeVoiceCall,
        isChatOpen,
        isVoiceCallOpen,
      }}
    >
      {children}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={closeChat}
        onOpenVoiceCall={openVoiceCall}
      />
      <AIVoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={closeVoiceCall}
        onOpenChat={openChat}
      />
    </AIModalContext.Provider>
  );
}

export function useAIModal() {
  const context = useContext(AIModalContext);
  if (!context) {
    throw new Error('useAIModal must be used within an AIModalProvider');
  }
  return context;
}
