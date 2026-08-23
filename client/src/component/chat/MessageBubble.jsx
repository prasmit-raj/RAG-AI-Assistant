import React, { useState } from "react";
import { Sparkles, User, FileText, Copy, Check, RotateCcw, ExternalLink } from "lucide-react";

function MessageBubble({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-4 py-4 px-4 sm:px-6 w-full max-w-4xl mx-auto transition-colors ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      <div
        className={`flex flex-col max-w-[85%] sm:max-w-[78%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* User Message Card */}
        {isUser ? (
          <div className="flex flex-col items-end">
            {/* Attached Files Badge */}
            {message.files && message.files.length > 0 && (
              <div className="flex flex-wrap justify-end gap-2 mb-2">
                {message.files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2a2a2a] border border-white/10 text-xs text-emerald-300"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="font-medium">{file.name}</span>
                    {file.size && (
                      <span className="text-[10px] text-gray-400">({file.size})</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Text Bubble */}
            <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-2xl rounded-tr-xs border border-white/10 text-sm leading-relaxed shadow-sm">
              {message.content}
            </div>
          </div>
        ) : (
          /* Assistant Message Content */
          <div className="flex flex-col items-start w-full">
            {/* Main AI Text Content */}
            <div className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {message.content}
            </div>

            {/* RAG Context Citation Badge */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 p-2.5 rounded-xl bg-[#1e1e1e] border border-white/5 w-full">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>RAG Vector Citations:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300"
                    >
                      📄 {source.fileName} ({source.chunks} chunks matched)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar (Copy / Regenerate) */}
            <div className="flex items-center gap-2 mt-2 pt-1 text-gray-400">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                  title="Regenerate response"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-emerald-600/80 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-white font-medium text-xs shadow-md">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
