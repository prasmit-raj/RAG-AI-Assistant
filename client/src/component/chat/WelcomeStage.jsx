import React from "react";
import { Sparkles, FileText, Search, BarChart3, HelpCircle, UploadCloud } from "lucide-react";

function WelcomeStage({ onSelectSuggestion }) {
  const suggestions = [
    {
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      title: "Summarize uploaded document",
      subtitle: "Extract executive summary, key findings & action items",
      prompt: "Can you summarize the main findings and key takeaways from my uploaded document?",
    },
    {
      icon: <Search className="w-5 h-5 text-blue-400" />,
      title: "Search key insights & facts",
      subtitle: "Locate specific statistics, metrics, or legal clauses",
      prompt: "What are the key financial numbers and important metrics mentioned in the PDF?",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      title: "Analyze document structure",
      subtitle: "Break down sections, arguments, and table of contents",
      prompt: "Analyze the structure of the document and outline its main sections.",
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
      title: "Generate Q&A & practice quiz",
      subtitle: "Formulate study questions based on PDF context",
      prompt: "Generate a list of 5 test questions and answers based on the uploaded content.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-4xl mx-auto text-center select-none">
      {/* Glow Icon Header */}
      <div className="relative mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full blur opacity-40 animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center shadow-xl">
          <Sparkles className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
        What can I help with today?
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-8">
        Ask any question or upload PDF documents to leverage local vector context with RAG AI.
      </p>

      {/* Suggestion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-3xl mb-8">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion(item.prompt)}
            className="group flex flex-col items-start text-left p-4 rounded-xl bg-[#2f2f2f]/60 hover:bg-[#2f2f2f] border border-white/5 hover:border-white/15 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {item.title}
              </span>
            </div>
            <span className="text-xs text-gray-400 line-clamp-2 pl-9">
              {item.subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* Quick PDF Upload Hint */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
        <UploadCloud className="w-4 h-4 text-emerald-400" />
        <span>Tip: Attach PDFs using the paperclip icon below to activate RAG search</span>
      </div>
    </div>
  );
}

export default WelcomeStage;
