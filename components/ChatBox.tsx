"use client";

import { useEffect, useRef } from "react";
import Message, { MessageRole } from "./Message";

interface ChatMessage {
  role: MessageRole;
  content: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export default function ChatBox({ messages, isLoading }: ChatBoxProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 w-full overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto flex flex-col space-y-6 pt-10 pb-4 px-4">
        {messages.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-2 dark:bg-gray-800 dark:border-gray-700">
                 <span className="text-2xl">🤖</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">How can I help you today?</h1>
           </div>
        ) : (
            messages.map((msg, i) => (
            <Message key={i} role={msg.role} content={msg.content} />
            ))
        )}
        {isLoading && (
           <Message role="assistant" content="Thinking..." />
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
