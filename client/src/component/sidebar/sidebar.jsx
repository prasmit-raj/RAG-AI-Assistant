import { useState } from "react";
import {
  PanelLeft,
  SquarePen,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  Trash2,
  Info,
  X,
  Sparkles,
} from "lucide-react";
import DocumentModal from "./DocumentModal";

function Sidebar({
  menuOpen: controlledMenuOpen,
  setMenuOpen: controlledSetMenuOpen,
  onNewChat,
  sessions = [],
  activeChatId,
  onSelectSession,
  onDeleteSession,
  documents = [],
  onRemoveDocument,
}) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDocForModal, setSelectedDocForModal] = useState(null);

  const menuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const setMenuOpen = controlledSetMenuOpen || setInternalMenuOpen;

  // Filter sessions based on search query
  const filteredSessions = sessions.filter((s) =>
    (s.title || "New chat").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-screen z-30 flex flex-col bg-[#171717] border-r border-white/5 text-white transition-all duration-300 ${
          menuOpen ? "w-64" : "w-16"
        }`}
      >
        {/* TOP TOGGLE */}
        <div className="relative flex items-center justify-between p-3">
          {menuOpen && (
            <div className="flex items-center gap-2 pl-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Sparkles size={18} />
              </div>
              <span className="font-semibold text-sm tracking-tight text-gray-100">
                RAG AI Assistant
              </span>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer ${
              !menuOpen ? "mx-auto" : ""
            }`}
            title={menuOpen ? "Collapse sidebar" : "Open sidebar"}
          >
            <PanelLeft size={20} />
          </button>
        </div>

        {/* CONTENT */}
        {menuOpen ? (
          <div className="flex flex-col flex-1 px-3 overflow-y-auto custom-scrollbar gap-1">
            {/* New Chat */}
            <button
              onClick={onNewChat}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium text-sm transition-all duration-200 cursor-pointer border border-emerald-500/20 group shadow-sm mt-1"
            >
              <SquarePen size={18} className="group-hover:scale-110 transition-transform" />
              <span>New chat</span>
            </button>

            {/* Search chats */}
            <div className="relative mt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#222222] border border-white/5 focus-within:border-white/20 transition-colors">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearching(true)}
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-0.5 text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* History Header Toggle */}
            <div className="mt-4">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} />
                  <span>Recent history</span>
                  {sessions.length > 0 && (
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded-full font-mono text-gray-300">
                      {sessions.length}
                    </span>
                  )}
                </div>
                {historyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* History content list */}
              {historyOpen && (
                <div className="mt-1 space-y-1">
                  {filteredSessions.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-gray-500 italic">
                      {searchQuery ? "No matching chats" : "No recent chats"}
                    </p>
                  ) : (
                    filteredSessions.map((session) => {
                      const isActive = session.id === activeChatId;
                      return (
                        <div
                          key={session.id}
                          onClick={() => onSelectSession(session.id)}
                          className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all duration-150 ${
                            isActive
                              ? "bg-[#2a2a2a] text-white font-medium border border-white/10 shadow-sm"
                              : "text-gray-300 hover:bg-[#222222] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate pr-6">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isActive ? "bg-emerald-400 animate-pulse" : "bg-gray-600"
                              }`}
                            />
                            <span className="truncate">{session.title || "Untitled chat"}</span>
                          </div>

                          {/* Delete Session Action Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSession(session.id);
                            }}
                            className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete session"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Documents Header Toggle */}
            <div className="mt-4">
              <button
                onClick={() => setDocumentsOpen(!documentsOpen)}
                className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-emerald-400" />
                  <span>Documents</span>
                  {documents.length > 0 && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full font-mono">
                      {documents.length}
                    </span>
                  )}
                </div>
                {documentsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Documents List */}
              {documentsOpen && (
                <div className="mt-1 space-y-1">
                  {documents.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-gray-500 italic">
                      No documents attached yet
                    </p>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDocForModal(doc)}
                        className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-[#222222]/80 hover:bg-[#2a2a2a] border border-white/5 hover:border-emerald-500/30 text-gray-300 hover:text-white transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <FileText size={15} className="text-emerald-400 shrink-0" />
                          <div className="flex flex-col truncate">
                            <span className="truncate font-medium">{doc.name}</span>
                            <span className="text-[10px] text-gray-400">{doc.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocForModal(doc);
                            }}
                            className="p-1 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors"
                            title="View Metadata"
                          >
                            <Info size={13} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveDocument(doc.id);
                            }}
                            className="p-1 rounded-md text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                            title="Remove Document"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto pt-4 pb-3 border-t border-white/5 space-y-1">
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-[#222222] hover:text-white transition-colors">
                Settings
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-[#222222] hover:text-white transition-colors">
                Privacy
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-[#222222] hover:text-white transition-colors">
                Help
              </button>
            </div>
          </div>
        ) : (
          /* CLOSED SIDEBAR ICON BAR */
          <div className="flex flex-col items-center gap-3 mt-2 px-2">
            <button
              onClick={onNewChat}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
              title="New chat"
            >
              <SquarePen size={20} />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-xl hover:bg-[#222222] text-gray-400 hover:text-white transition-colors"
              title="Search chats"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-xl hover:bg-[#222222] text-gray-400 hover:text-white transition-colors relative"
              title="Recent history"
            >
              <MessageSquare size={20} />
              {sessions.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-xl hover:bg-[#222222] text-gray-400 hover:text-white transition-colors relative"
              title="Documents"
            >
              <FileText size={20} className="text-emerald-400" />
              {documents.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Document Metadata Modal Popup */}
      {selectedDocForModal && (
        <DocumentModal
          document={selectedDocForModal}
          onClose={() => setSelectedDocForModal(null)}
          onRemove={(docId) => {
            onRemoveDocument(docId);
            setSelectedDocForModal(null);
          }}
        />
      )}
    </>
  );
}

export default Sidebar;