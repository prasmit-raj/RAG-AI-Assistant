import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Sparkles } from "lucide-react";

function MessageList({ messages, isTyping, onRegenerate }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-white/5 py-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onRegenerate={msg.role === "assistant" ? onRegenerate : undefined} />
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex gap-4 py-4 px-4 sm:px-6 w-full max-w-4xl mx-auto items-center">
          <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          </div>
          <div className="flex items-center gap-1.5 bg-[#2a2a2a] px-4 py-2.5 rounded-2xl rounded-tl-xs border border-white/10">
            <span className="text-xs text-gray-400 font-medium">Analyzing vector embeddings</span>
            <div className="flex items-center gap-1 ml-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
