import React from "react";
import { X, FileText, CheckCircle2, HardDrive, Layers, Calendar, Trash2, ShieldCheck } from "lucide-react";

function DocumentModal({ document, onClose, onRemove }) {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#252525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1c1c1c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white truncate max-w-[240px]">
                {document.name}
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                {document.type || "Document"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-4 text-xs">

          {/* Status Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">Active Retrieval Context</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 font-mono font-medium">
              READY
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#1e1e1e] border border-white/5 flex flex-col gap-1">
              <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" /> File Size
              </span>
              <span className="font-semibold text-white text-xs">{document.size || "1.2 MB"}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1e1e1e] border border-white/5 flex flex-col gap-1">
              <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Vector Chunks
              </span>
              <span className="font-semibold text-white text-xs">{document.chunks || 4} Indexed</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1e1e1e] border border-white/5 flex flex-col gap-1">
              <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Upload Time
              </span>
              <span className="font-semibold text-white text-xs">{document.uploadTime || "Just now"}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1e1e1e] border border-white/5 flex flex-col gap-1">
              <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Embedding Status
              </span>
              <span className="font-semibold text-emerald-400 text-xs">Vectorized</span>
            </div>
          </div>

          {/* Info Banner */}
          <p className="text-[11px] text-gray-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            This document is stored in the local vector RAG store. The assistant uses semantic embeddings from this document to generate accurate responses with citations.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1c1c1c] border-t border-white/10">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onRemove(document.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove from Context</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default DocumentModal;
