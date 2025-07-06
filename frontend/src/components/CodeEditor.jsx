import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { ShareIcon } from "lucide-react";

import { useCodeEditorStore } from "../store/useCodeEditorStore";
import ShareSnippetDialog from "./ShareSnippetDialog";
import { LANGUAGE_CONFIG } from "../constants";
import { defineMonacoThemes } from "../constants/defineMonacoThemes";

const EditorPanel = () => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setEditor } = useCodeEditorStore();

  const currentLangConfig = LANGUAGE_CONFIG[language]; // get current config

  const handleEditorChange = (value) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  return (
    <div className="w-full h-full bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
            <img
              src={`/${language}.png`} // assuming you have these: /python.png, /javascript.png, etc.
              alt={`${language} icon`}
              className="w-5 h-5"
            />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Code Editor</h2>
          </div>
        </div>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsShareDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90"
        >
          <ShareIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Save</span>
        </motion.button>
      </div>

      {/* Editor */}
      <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
        <Editor
          height="100%"
          language={currentLangConfig.monacoLanguage}
          theme={theme}
          beforeMount={defineMonacoThemes}
          onMount={(editor) => setEditor(editor)}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            fontFamily: '"Fira Code", monospace',
            fontLigatures: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            lineHeight: 1.6,
            roundedSelection: true,
          }}
        />
      </div>

      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
};

export default EditorPanel;
