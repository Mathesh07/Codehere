"use client";

import { useCodeEditorStore } from "../store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import InputBox from "./InputBox";

function OutputPanel() {
  const { output, error, isRunning, input, setInput } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
            <Terminal className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Output</h2>
            <p className="text-xs text-gray-500">View code execution results</p>
          </div>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-[#1e1e2e] 
              rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4" />
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Input Area */}
      <InputBox />


      {/* Output Content */}
      <div className="flex-1 rounded-xl overflow-auto ring-1 ring-white/[0.05] p-4 bg-[#1e1e2e]/50 font-mono text-sm">
        {isRunning ? (
          <h1>Running</h1>
        ) : error ? (
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
            <div>
              <div className="font-medium">Execution Error</div>
              <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Execution Successful</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-center">Run your code to see the output here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
