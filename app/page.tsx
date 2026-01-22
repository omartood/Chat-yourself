"use client";

import { useState } from "react";
import ChatBox from "../components/ChatBox";
import InputBar from "../components/InputBar";
import Sidebar from "../components/Sidebar";
import { MessageRole } from "../components/Message";

export default function Home() {
  const [messages, setMessages] = useState<{ role: MessageRole; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async (text: string, file?: File) => {
    // Add user message only if there's text
    const newMessages = text.trim() 
      ? [...messages, { role: "user" as MessageRole, content: text }]
      : messages;
    
    if (text.trim()) {
      setMessages(newMessages);
    }
    setIsLoading(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('File upload failed');
        
        // If only uploading file without text, show success message
        if (!text.trim()) {
          setMessages((prev) => [...prev, { 
            role: "assistant" as MessageRole, 
            content: "✓ File uploaded successfully! You can now ask questions about it." 
          }]);
          setIsLoading(false);
          return;
        }
      }

      // Skip chat if no text content
      if (!text.trim()) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setMessages((prev) => [...prev, { role: "assistant" as MessageRole, content: "" }]);

      let aiContent = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant" as MessageRole, content: aiContent };
          return updated;
        });
      }

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant" as MessageRole, content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#212121]">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onNewChat={handleNewChat}
      />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        {/* Header */}
        <header className="flex-none h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-white z-10 dark:bg-[#212121] dark:border-white/10">
          <div className="flex items-center space-x-3">
             <button 
               onClick={() => setSidebarOpen(true)}
               className="md:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
             >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="3" y1="12" x2="21" y2="12"></line>
                 <line x1="3" y1="6" x2="21" y2="6"></line>
                 <line x1="3" y1="18" x2="21" y2="18"></line>
               </svg>
             </button>
             <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-100">Chat-Yourself</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300"></span>
             </div>
          </div>
          <div className="text-sm text-gray-400 dark:text-gray-500">Model: Memvid-Hybrid</div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col relative w-full dark:bg-[#212121]">
          <ChatBox messages={messages} isLoading={isLoading} />
        </div>

        {/* Input Area */}
        <div className="flex-none w-full bg-white z-20 dark:bg-[#212121]">
          <InputBar onSend={handleSend} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
