
export type MessageRole = "user" | "assistant";

interface MessageProps {
  role: MessageRole;
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";
  
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div 
        className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser 
            ? "bg-gray-900 text-white dark:bg-[#2f2f2f]" 
            : "bg-gray-100 text-gray-900 dark:bg-transparent dark:text-gray-100"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
