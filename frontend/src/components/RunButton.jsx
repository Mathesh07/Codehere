import { motion } from "framer-motion";
import { Play, Loader2 } from "lucide-react";
import { useCodeEditorStore } from "../store/useCodeEditorStore";

function RunButton() {
  const runCode = useCodeEditorStore((state) => state.runCode);
  const fetchComplexity = useCodeEditorStore((state) => state.fetchComplexity);
  const isRunning = useCodeEditorStore((state) => state.isRunning);

  const handleRun = async () => {
    await runCode();
    await fetchComplexity();
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2.5 px-6 py-2 disabled:cursor-not-allowed focus:outline-none rounded-xl`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />
      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white/80" />
            <span className="text-sm font-semibold text-white/90">Running...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">Run Code</span>
          </>
        )}
      </div>
    </motion.button>
  );
}

export default RunButton;
