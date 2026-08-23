import React, { useState } from "react";
import WelcomeStage from "./WelcomeStage";
import MessageList from "./MessageList";
import ChatInputBar from "./ChatInputBar";
import { Sparkles, Trash2, Cpu, FileCheck } from "lucide-react";

function ChatStage({ menuOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChatId, setActiveChatId] = useState(() => `chat_${Date.now()}`);

  // Listen to New Chat events from Sidebar
  React.useEffect(() => {
    const handleNewChatEvent = () => {
      handleClearChat();
    };
    window.addEventListener("new_chat_triggered", handleNewChatEvent);
    return () => {
      window.removeEventListener("new_chat_triggered", handleNewChatEvent);
    };
  }, []);

  // Helper to format bytes to human readable string
  const formatFileSize = (bytes) => {
    if (!bytes) return "1.2 MB";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Mock File Upload Handler
  const handleFileUpload = (newFiles) => {
    const fileObjects = newFiles.map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      name: file.name || "Sample_Document.pdf",
      size: formatFileSize(file.size),
      type: file.type || "application/pdf",
      raw: file,
    }));

    setUploadedFiles((prev) => [...prev, ...fileObjects]);
  };

  // Remove File Handler
  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Select Quick Suggestion Handler
  const handleSelectSuggestion = (promptText) => {
    setInputText(promptText);
  };

  // Clear Chat / New Chat Handler
  const handleClearChat = () => {
    setMessages([]);
    setInputText("");
    setUploadedFiles([]);
    setIsTyping(false);
    setActiveChatId(`chat_${Date.now()}`);
  };

  // Send Message Handler with Mock RAG Response
  const handleSendMessage = () => {
    const userPrompt = inputText.trim();
    const currentFiles = [...uploadedFiles];

    if (!userPrompt && currentFiles.length === 0) return;

    // 1. Create User Message
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      role: "user",
      content: userPrompt || `[Attached ${currentFiles.length} file(s)]`,
      files: currentFiles,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setUploadedFiles([]);
    setIsTyping(true);

    // 2. Simulate RAG Retrieval & AI Generation
    setTimeout(() => {
      let aiContent = "";
      let sources = [];

      if (currentFiles.length > 0) {
        const fileNames = currentFiles.map((f) => f.name).join(", ");
        aiContent = `Based on your attached document **${fileNames}**, I analyzed the vector embeddings and retrieved key context.\n\n### Summary & Insights\n1. **Core Theme**: The document details operational strategies, key metrics, and quarterly performance goals.\n2. **Critical Takeaways**: All milestones align with project timelines, highlighting a 24% efficiency increase.\n3. **Recommended Actions**: Further review section 3 for compliance guidelines.\n\nLet me know if you would like me to extract specific data points or build a Q&A summary!`;
        sources = currentFiles.map((f) => ({
          fileName: f.name,
          chunks: Math.floor(Math.random() * 4) + 2,
        }));
      } else if (userPrompt.toLowerCase().includes("summarize")) {
        aiContent = `### Document Executive Summary\n- **Objective**: Synthesize primary findings from uploaded reference files.\n- **Key Highlights**: High precision semantic search enabled across PDF tables and plain text.\n- **Conclusion**: Ready to answer follow-up queries or pull detailed quotes from your documents.`;
        sources = [{ fileName: "Knowledge_Base.pdf", chunks: 3 }];
      } else {
        aiContent = `I am your RAG AI Assistant. I can process PDF files, index text into vector search chunks, and answer detailed queries with accurate source citations.\n\nHow else can I assist you with your documents today?`;
      }

      const aiMsg = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        content: aiContent,
        sources: sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleRegenerate = () => {
    if (messages.length === 0 || isTyping) return;
    setIsTyping(true);
    setTimeout(() => {
      const regeneratedMsg = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        content: `I've re-analyzed your prompt and document context.\n\n### Refined RAG Analysis\n- **Updated Findings**: All key entities and numeric metrics have been verified against the vector store.\n- **Precision Score**: 98.4% context confidence match.`,
        sources: [{ fileName: "Document_Context.pdf", chunks: 4 }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev.slice(0, -1), regeneratedMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#212121] text-gray-100 flex-1 overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-white/5 bg-[#171717]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1 rounded-full border border-white/10 text-xs font-medium">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>RAG Model: GPT-4o</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
            <FileCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Vector RAG Active</span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear current thread"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Clear thread</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area: Welcome Stage (Empty) OR Message List (Active) */}
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        {messages.length === 0 ? (
          <WelcomeStage onSelectSuggestion={handleSelectSuggestion} />
        ) : (
          <MessageList
            messages={messages}
            isTyping={isTyping}
            onRegenerate={handleRegenerate}
          />
        )}
      </main>

      {/* Bottom Floating Input Bar */}
      <footer className="shrink-0 bg-[#212121]/90 backdrop-blur-sm z-20">
        <ChatInputBar
          inputText={inputText}
          setInputText={setInputText}
          uploadedFiles={uploadedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </footer>
    </div>
  );
}

export default ChatStage;
