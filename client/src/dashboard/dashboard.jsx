import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/sidebar";
import ChatStage from "../component/chat/ChatStage";

const SESSIONS_KEY = "rag_ai_chat_sessions";
const DOCUMENTS_KEY = "rag_ai_documents";
const ACTIVE_CHAT_KEY = "rag_ai_active_chat";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);

  // Persistence State
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem(DOCUMENTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_CHAT_KEY);
      return saved || `chat_${Date.now()}`;
    } catch {
      return `chat_${Date.now()}`;
    }
  });

  // Local active chat input and staging state
  const [inputText, setInputText] = useState("");
  const [stagedFiles, setStagedFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Sync to localStorage whenever sessions change
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save sessions to localStorage", e);
    }
  }, [sessions]);

  // Sync to localStorage whenever documents change
  useEffect(() => {
    try {
      localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
    } catch (e) {
      console.error("Failed to save documents to localStorage", e);
    }
  }, [documents]);

  // Sync to localStorage whenever activeChatId changes
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_CHAT_KEY, activeChatId);
    } catch (e) {
      console.error("Failed to save active chat ID", e);
    }
  }, [activeChatId]);

  // Find active session object
  const currentSession = sessions.find((s) => s.id === activeChatId);
  const activeMessages = currentSession ? currentSession.messages : [];

  // Helper: Format file sizes
  const formatFileSize = (bytes) => {
    if (!bytes) return "1.2 MB";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Helper: Title Generator based on first user prompt
  const generateTitleFromPrompt = (prompt, files) => {
    if (prompt && prompt.trim().length > 0) {
      const clean = prompt.trim();
      return clean.length > 32 ? clean.slice(0, 32) + "..." : clean;
    }
    if (files && files.length > 0) {
      return `Doc: ${files[0].name}`;
    }
    return "New chat";
  };

  // Action: New Chat Button Click
  const handleNewChat = () => {
    const newId = `chat_${Date.now()}`;
    setActiveChatId(newId);
    setInputText("");
    setStagedFiles([]);
    setIsTyping(false);
  };

  // Action: Select Past Chat Session from Sidebar
  const handleSelectSession = (chatId) => {
    setActiveChatId(chatId);
    setInputText("");
    setStagedFiles([]);
  };

  // Action: Delete Chat Session from History
  const handleDeleteSession = (chatId) => {
    setSessions((prev) => prev.filter((s) => s.id !== chatId));
    // Also remove documents associated with this chat if any
    setDocuments((prev) => prev.filter((d) => d.chatId !== chatId));

    if (activeChatId === chatId) {
      handleNewChat();
    }
  };

  // Action: File Upload Handler
  const handleFileUpload = (newFiles) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const fileObjects = newFiles.map((file, index) => ({
      id: `doc_${Date.now()}_${index}`,
      name: file.name || "Sample_Document.pdf",
      size: formatFileSize(file.size),
      type: file.type || "application/pdf",
      uploadTime: timeStr,
      chunks: Math.floor(Math.random() * 4) + 2,
      status: "active",
      chatId: activeChatId,
    }));

    // Add to staged files for chat input preview
    setStagedFiles((prev) => [...prev, ...fileObjects]);

    // Add to global documents list for sidebar tracking
    setDocuments((prev) => [...prev, ...fileObjects]);
  };

  // Action: Remove Attached File or Document
  const handleRemoveDocument = (docId) => {
    setStagedFiles((prev) => prev.filter((f) => f.id !== docId));
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  // Action: Send User Message & Trigger RAG AI Response
  const handleSendMessage = () => {
    const userPrompt = inputText.trim();
    const currentFiles = [...stagedFiles];

    if (!userPrompt && currentFiles.length === 0) return;

    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create User Message object
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      role: "user",
      content: userPrompt || `[Attached ${currentFiles.length} file(s)]`,
      files: currentFiles,
      timestamp: timeStr,
    };

    // Determine or update session title
    let sessionTitle = currentSession?.title;
    if (!sessionTitle || sessionTitle === "New chat") {
      sessionTitle = generateTitleFromPrompt(userPrompt, currentFiles);
    }

    // Update active session messages immediately
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === activeChatId);
      if (exists) {
        return prev.map((s) =>
          s.id === activeChatId
            ? {
                ...s,
                title: sessionTitle,
                messages: [...s.messages, userMsg],
                updatedAt: Date.now(),
              }
            : s
        );
      } else {
        const newSession = {
          id: activeChatId,
          title: sessionTitle,
          messages: [userMsg],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        return [newSession, ...prev];
      }
    });

    setInputText("");
    setStagedFiles([]);
    setIsTyping(true);

    // Simulate RAG AI Retrieval & Generation
    setTimeout(() => {
      let aiContent = "";
      let sources = [];

      if (currentFiles.length > 0) {
        const fileNames = currentFiles.map((f) => f.name).join(", ");
        aiContent = `Based on your attached document **${fileNames}**, I analyzed the vector embeddings and retrieved key context.\n\n### Summary & Insights\n1. **Core Theme**: The document details operational strategies, key metrics, and quarterly performance goals.\n2. **Critical Takeaways**: All milestones align with project timelines, highlighting a 24% efficiency increase.\n3. **Recommended Actions**: Further review section 3 for compliance guidelines.\n\nLet me know if you would like me to extract specific data points or build a Q&A summary!`;
        sources = currentFiles.map((f) => ({
          fileName: f.name,
          chunks: f.chunks || 3,
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeChatId
            ? {
                ...s,
                messages: [...s.messages, aiMsg],
                updatedAt: Date.now(),
              }
            : s
        )
      );

      setIsTyping(false);
    }, 1100);
  };

  // Action: Regenerate Last AI Response
  const handleRegenerate = () => {
    if (!currentSession || activeMessages.length === 0 || isTyping) return;
    setIsTyping(true);

    setTimeout(() => {
      const regeneratedMsg = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        content: `I've re-analyzed your prompt and document context.\n\n### Refined RAG Analysis\n- **Updated Findings**: All key entities and numeric metrics have been verified against the vector store.\n- **Precision Score**: 98.4% context confidence match.`,
        sources: [{ fileName: "Document_Context.pdf", chunks: 4 }],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeChatId) {
            const updated = [...s.messages.slice(0, -1), regeneratedMsg];
            return { ...s, messages: updated, updatedAt: Date.now() };
          }
          return s;
        })
      );
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex h-screen w-screen bg-[#212121] overflow-hidden font-sans">
      {/* Pinned Left Sidebar */}
      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNewChat={handleNewChat}
        sessions={sessions}
        activeChatId={activeChatId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        documents={documents}
        onRemoveDocument={handleRemoveDocument}
      />

      {/* Main Chat Stage Area */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          menuOpen ? "ml-64" : "ml-16"
        }`}
      >
        <ChatStage
          messages={activeMessages}
          inputText={inputText}
          setInputText={setInputText}
          uploadedFiles={stagedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveDocument}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
}

export default Dashboard;