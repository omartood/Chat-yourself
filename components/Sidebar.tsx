"use client";

import { useEffect, useRef } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export default function Sidebar({ isOpen, onClose, onNewChat }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 768 // Only on mobile
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-gray-50 dark:bg-[#171717] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-none border-r border-gray-200 dark:border-white/5 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-3">
          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#212121] hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition-colors text-sm text-gray-700 dark:text-gray-100 shadow-sm"
          >
            <div className="p-1 rounded-full bg-gray-100 dark:bg-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
            <span>New chat</span>
            <div className="ml-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </div>
          </button>

          {/* History List Placeholder */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-2">
            <div className="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-2">
              Recent
            </div>
            {/* Example History Item - Static for now */}
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-lg truncate transition-colors">
              Project Planning
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-lg truncate transition-colors">
              Memvid Architecture
            </button>
          </div>

          {/* User Profile / Settings Area */}
          <div className="mt-auto border-t border-gray-200 dark:border-white/10 pt-3">
             <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition-colors text-sm text-gray-700 dark:text-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                    OM
                </div>
                <div className="flex flex-col text-left">
                    <span className="font-medium">User</span>
                    <span className="text-xs text-gray-400">Pro Plan</span>
                </div>
             </button>
          </div>
        </div>
      </aside>
    </>
  );
}
