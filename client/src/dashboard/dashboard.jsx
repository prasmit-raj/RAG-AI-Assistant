import React, { useState, useRef } from "react";
import Sidebar from "../component/sidebar/sidebar";
import ChatStage from "../component/chat/ChatStage";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);
  const chatStageRef = useRef(null);

  const handleNewChat = () => {
    // If needed, trigger chat reset via page or state
    window.dispatchEvent(new CustomEvent("new_chat_triggered"));
  };

  return (
    <div className="flex h-screen w-screen bg-[#212121] overflow-hidden font-sans">
      {/* Pinned Left Sidebar */}
      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Stage Area (Adjusts margin based on sidebar state) */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          menuOpen ? "ml-64" : "ml-16"
        }`}
      >
        <ChatStage menuOpen={menuOpen} />
      </div>
    </div>
  );
}

export default Dashboard;