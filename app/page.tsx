"use client";

import { useState } from "react";
import ChatBox from "../components/ChatBox";
import InputBar from "../components/InputBar";
import { MessageRole } from "../components/Message";

export default function Home() {
  const [messages, setMessages] = useState<{ role: MessageRole; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string, file?: File) => {
    // Add user message
    const newMessages = [...messages, { role: "user" as MessageRole, content: text }];
    setMessages(newMessages);
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

  return (
    <main className="flex flex-col h-screen bg-white dark:bg-[#212121]">
      {/* Header */}
      <header className="flex-none h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-white z-10 dark:bg-[#212121] dark:border-white/10">
        <div className="flex items-center space-x-2">
           <span className="font-semibold text-gray-700 dark:text-gray-100">Clone-Yourself</span>
           <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300"></span>
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
  );
}
