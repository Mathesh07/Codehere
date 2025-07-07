// src/constants/defineMonacoThemes.js
import * as monaco from "monaco-editor";

export function defineMonacoThemes(monacoInstance) {
  monacoInstance.editor.defineTheme("github-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editorLineNumber.foreground": "#8b949e",
      "editorCursor.foreground": "#58a6ff",
      "editor.selectionBackground": "#264f78",
    },
  });

  monacoInstance.editor.defineTheme("monokai", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#f8f8f2",
      "editorLineNumber.foreground": "#75715e",
      "editorCursor.foreground": "#f8f8f0",
      "editor.selectionBackground": "#49483e",
    },
  });

  monacoInstance.editor.defineTheme("solarized-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editorCursor.foreground": "#93a1a1",
      "editor.selectionBackground": "#073642",
    },
  });
}
