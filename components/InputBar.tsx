"use client";

import { useState, useRef, useEffect } from "react";

interface InputBarProps {
  onSend: (text: string, file?: File) => void;
  isLoading?: boolean;
}

export default function InputBar({ onSend, isLoading }: InputBarProps) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSend(input);
        setInput("");
        // Reset height
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  return (
    <div className="w-full bg-white p-4 pb-6 dark:bg-[#212121]">
      <div className="mx-auto max-w-3xl relative">
        <div className="relative flex items-end w-full p-3 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm dark:bg-[#2f2f2f] dark:border-gray-600/50 transition-all duration-200 ease-in-out">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-none p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mb-1 ml-1"
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {selectedFile && (
            <div className="absolute left-10 bottom-12 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-xs flex items-center gap-2 shadow-sm border border-gray-200 dark:border-gray-700">
               <span className="truncate max-w-[150px]">{selectedFile.name}</span>
               <button onClick={clearFile} className="hover:text-red-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
               </button>
            </div>
          )}

          <textarea
            ref={textareaRef}
            className="flex-1 max-h-[200px] bg-transparent border-0 focus:ring-0 focus:outline-none resize-none py-3 pr-10 pl-2 text-base leading-relaxed placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
            placeholder="Ask anything"
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={() => {
              if ((input.trim() || selectedFile) && !isLoading) {
                onSend(input, selectedFile || undefined);
                setInput("");
                clearFile();
                 if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                }
              }
            }}
            disabled={(!input.trim() && !selectedFile) || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full transition-all shadow-sm ${
              (input.trim() || selectedFile) && !isLoading 
                ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
            }`}
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-0">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </button>
        </div>
        <div className="text-center text-xs text-gray-400 mt-2">
            AI can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
