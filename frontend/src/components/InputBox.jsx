import React from 'react';
import { useCodeEditorStore } from "../store/useCodeEditorStore";

const InputBox = () => {
  const input = useCodeEditorStore((state) => state.input);
  const setInput = useCodeEditorStore((state) => state.setInput);

  return (
    <div className="mb-4">
      <label className="text-xs text-gray-400 mb-1 block">Custom Input (stdin)</label>
      <textarea
        className="w-full p-3 bg-[#1e1e2e]/70 border border-white/10 rounded-lg text-sm text-gray-200 font-mono resize-none h-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Enter input like 5\n6..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
