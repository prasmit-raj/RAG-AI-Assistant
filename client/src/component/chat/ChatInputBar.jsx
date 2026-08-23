import React, { useRef, useEffect } from "react";
import { Paperclip, ArrowUp, X, FileText, CheckCircle2 } from "lucide-react";

function ChatInputBar({
  inputText,
  setInputText,
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
  onSendMessage,
  isTyping,
}) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((inputText.trim() || uploadedFiles.length > 0) && !isTyping) {
        onSendMessage();
      }
    }
  };

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
      // Reset input value so re-selecting the same file fires onChange again
      e.target.value = "";
    }
  };

  const canSend = (inputText.trim().length > 0 || uploadedFiles.length > 0) && !isTyping;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      {/* Container with sleek dark styling */}
      <div className="relative flex flex-col bg-[#2f2f2f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden focus-within:border-white/20 transition-all duration-200">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          multiple
          className="hidden"
        />

        {/* Staged Attached Files Preview Bar */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 pb-1 border-b border-white/5 bg-[#252525]">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#383838] border border-white/10 text-xs text-gray-200 group hover:border-emerald-500/50 transition-colors"
              >
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col max-w-[180px]">
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-[10px] text-gray-400">{file.size}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors ml-1 cursor-pointer"
                  title="Remove attachment"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <span className="text-[11px] text-emerald-400/90 flex items-center gap-1 ml-auto">
              <CheckCircle2 className="w-3 h-3" /> Ready for RAG context
            </span>
          </div>
        )}

        {/* Text input area & action buttons */}
        <div className="flex items-end gap-2 p-3">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={handlePaperclipClick}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            title="Attach document (PDF, TXT, DOCX)"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              uploadedFiles.length > 0
                ? "Ask a question about the attached PDF..."
                : "Ask anything or attach a PDF..."
            }
            className="flex-1 bg-transparent border-0 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-0 resize-none py-1.5 px-1 max-h-[200px] leading-relaxed"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={onSendMessage}
            disabled={!canSend}
            className={`p-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
              canSend
                ? "bg-white text-black hover:bg-gray-200 shadow-md transform active:scale-95"
                : "bg-white/10 text-gray-500 cursor-not-allowed"
            }`}
            title="Send message"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Footer hint */}
      <p className="text-[11px] text-center text-gray-500 mt-2 select-none">
        RAG AI Assistant uses semantic document retrieval. Check facts & source documents.
      </p>
    </div>
  );
}

export default ChatInputBar;
