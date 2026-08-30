import React from "react";
import WelcomeStage from "./WelcomeStage";
import MessageList from "./MessageList";
import ChatInputBar from "./ChatInputBar";

function ChatStage({
  messages = [],
  inputText,
  setInputText,
  uploadedFiles = [],
  onFileUpload,
  onRemoveFile,
  onSendMessage,
  isTyping,
  onRegenerate,
}) {

  // Select Quick Suggestion Handler
  const handleSelectSuggestion = (promptText) => {
    setInputText(promptText);
  };

  return (
    <div className="flex flex-col h-screen bg-[#212121] text-gray-100 flex-1 overflow-hidden relative">
      {/* Main Content Area: Welcome Stage (Empty) OR Message List (Active) */}
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        {messages.length === 0 ? (
          <WelcomeStage onSelectSuggestion={handleSelectSuggestion} />
        ) : (
          <MessageList
            messages={messages}
            isTyping={isTyping}
            onRegenerate={onRegenerate}
          />
        )}
      </main>

      {/* Bottom Floating Input Bar */}
      <footer className="shrink-0 bg-[#212121]/90 backdrop-blur-sm z-20">
        <ChatInputBar
          inputText={inputText}
          setInputText={setInputText}
          uploadedFiles={uploadedFiles}
          onFileUpload={onFileUpload}
          onRemoveFile={onRemoveFile}
          onSendMessage={onSendMessage}
          isTyping={isTyping}
        />
      </footer>
    </div>
  );
}

export default ChatStage;
