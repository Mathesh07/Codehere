// store/useCodeEditorStore.js
import { create } from "zustand";
import { LANGUAGE_CONFIG } from "../constants";
import * as monaco from "monaco-editor";


const JUDGE0_API_KEY = "9128574bdamsh5f499a697729a19p19e018jsn0fc166e31a3d";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  return {
    language: localStorage.getItem("editor-language") || "python",
    theme: localStorage.getItem("editor-theme") || "vs-dark",
    fontSize: Number(localStorage.getItem("editor-font-size")) || 16,
  };
};

export const useCodeEditorStore = create((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    input: "",
    isRunning: false,
    isAnalyzing: false, // ⬅️ new loader flag
    error: null,
    editor: null,
    executionResult: null,
    complexity: {
      time: null,
      space: null,
    },

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },

    setTheme: (theme) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (newLangKey) => {
      const { editor, language: currentLangKey } = get();
      const currentCode = editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${currentLangKey}`, currentCode);
      }

      localStorage.setItem("editor-language", newLangKey);
      set({ language: newLangKey, output: "", error: null });

      if (editor) {
        const newLangConfig = LANGUAGE_CONFIG[newLangKey];
        if (!newLangConfig) return console.error("Invalid language key:", newLangKey);

        monaco.editor.setModelLanguage(editor.getModel(), newLangConfig.monacoLanguage);
        const newCode = localStorage.getItem(`editor-code-${newLangKey}`) || newLangConfig.defaultCode;
        editor.setValue(newCode);
      }
    },

    setInput: (input) => set({ input }),

    setComplexity: (time, space) => set({ complexity: { time, space } }),

    runCode: async () => {
      const { language, getCode, input } = get();
      const code = getCode();
      if (!code) return set({ error: "Please enter some code" });

      set({ isRunning: true, error: null, output: "" });

      try {
        const langConfig = LANGUAGE_CONFIG[language];
        const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": JUDGE0_API_KEY,
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            language_id: langConfig.judge0_id,
            source_code: code,
            stdin: input || "",
          }),
        });

        const { token } = await response.json();

        let result = null;
        for (let i = 0; i < 10; i++) {
          const pollRes = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
            method: "GET",
            headers: {
              "x-rapidapi-key": JUDGE0_API_KEY,
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            },
          });

          const pollData = await pollRes.json();
          if (pollData.status?.id >= 3) {
            result = pollData;
            break;
          }

          await new Promise((res) => setTimeout(res, 1000));
        }

        if (!result) {
          set({ error: "Timeout: Unable to fetch result", executionResult: { code, output: "", error: "Timeout" } });
          return;
        }

        if (result.stderr) {
          set({ error: result.stderr, executionResult: { code, output: "", error: result.stderr } });
          return;
        }

        set({
          output: result.stdout?.trim() || "No output",
          error: null,
          executionResult: { code, output: result.stdout?.trim() || "", error: null },
        });
      } catch (err) {
        console.error("Execution error:", err);
        set({ error: "Execution failed", executionResult: { code, output: "", error: "Execution failed" } });
      } finally {
        set({ isRunning: false });
      }
    },

    fetchComplexity: async () => {
      const { getCode, setComplexity } = get();
      const code = getCode();

      set({ isAnalyzing: true }); 
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();
        setComplexity(data.timeComplexity, data.spaceComplexity);
      } catch (error) {
        console.error("Complexity fetch failed:", error);
        setComplexity("Error", "Error");
      } finally {
        set({ isAnalyzing: false }); 
      }
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
