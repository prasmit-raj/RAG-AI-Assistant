import { useState } from "react";
import { PanelLeft ,SquarePen,Search , ChevronDown, ChevronUp,FileText,MessageSquare } from "lucide-react";

function Sidebar({ menuOpen: controlledMenuOpen, setMenuOpen: controlledSetMenuOpen, onNewChat }) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(true);

  const menuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const setMenuOpen = controlledSetMenuOpen || setInternalMenuOpen;

  return (
 <nav
  className={`fixed top-0 left-0 h-screen z-30 flex flex-col bg-[#171717] border-r border-white/5 text-white transition-all duration-300 ${
    menuOpen ? "w-64" : "w-16"
  }`}
>
  {/* TOP */}
  <div className="relative">

    {/* Toggle */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className={`p-2 rounded-lg hover:bg-gray-700 ${
        menuOpen ? "ml-auto mr-3 mt-3" : "m-3"
      }`}
    >
      <PanelLeft size={22} />
    </button>

  </div>

  {/* CONTENT */}
  {menuOpen ? (
    <div className="flex flex-col flex-1 px-3">

      {/* New Chat */}
      <button 
        onClick={onNewChat}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-[#2f2f2f] hover:text-white transition-colors cursor-pointer"
      >
        <SquarePen size={18} />
        <span>New chat</span>
      </button>

      {/* Search */}
      <button className="flex items-center mb-8 gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
        <Search size={18} />
        <span>Search chats</span>
      </button>

      {/* History */}
      <button
        onClick={() => setHistoryOpen(!historyOpen)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
      >
        <div className="flex items-center gap-3">
          <span>Recent history</span>
        </div>

        {historyOpen ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {/* History content */}
      {historyOpen && (
        <div className="ml-3 px-3 py-2 text-sm text-gray-400">
          {/* chats will go here */}
        </div>
      )}

      {/* Documents */}
      <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
        <FileText size={18} />
        <span>Documents</span>
      </button>

      {/* Bottom */}
      <div className="mt-auto pb-3">
        {/* Settings / Privacy / Help */}
        
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
          Settings
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
          Privacy
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
          Help
        </button>
      
      </div>

    </div>
  ) : (
    /* CLOSED SIDEBAR */
   <div className="flex flex-col items-center gap-3 mt-4">

  {/* Sidebar */}
  <button
    onClick={() => setMenuOpen(true)}
    className="p-2 rounded-lg hover:bg-gray-700"
    title="Open sidebar"
  >
    <PanelLeft size={22} />
  </button>

  {/* New Chat */}
  <button
    onClick={onNewChat}
    className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
    title="New chat"
  >
    <SquarePen size={22} />
  </button>

  {/* Search Chats */}
  <button
    className="p-2 rounded-lg hover:bg-gray-700"
    title="Search chats"
  >
    <Search size={22} />
  </button>

  {/* History */}
  <button
    className="p-2 rounded-lg hover:bg-gray-700"
    title="Recent history"
  >
     <MessageSquare size={22} />
  </button>

  {/* Documents */}
  <button
    className="p-2 rounded-lg hover:bg-gray-700"
    title="Documents"
  >
    <FileText size={22} />
  </button>

</div>
  )}
</nav>
  );
}

export default Sidebar;