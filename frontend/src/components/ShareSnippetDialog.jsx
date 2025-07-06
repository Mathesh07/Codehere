import { useState } from "react";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import toast from "react-hot-toast";
import { X } from "lucide-react";

function ShareSnippetDialog({ onClose }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const { language, editor } = useCodeEditorStore();

const handleShare = async (e) => {
  e.preventDefault();
  setIsSharing(true);

  try {
    const code = editor?.getValue() || "";

    const newSnippet = {
      id: Date.now(), // unique ID
      title,
      language,
      code,
      createdAt: new Date().toISOString(),
    };

    // Get existing snippets
    const stored = JSON.parse(localStorage.getItem("snippets") || "[]");

    // Add the new snippet
    const updated = [newSnippet, ...stored];
    localStorage.setItem("snippets", JSON.stringify(updated));

    toast.success("Snippet saved locally");
    onClose();
    setTitle("");
  } catch (error) {
    console.error("Error saving snippet:", error);
    toast.error("Error saving snippet");
  } finally {
    setIsSharing(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet title"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareSnippetDialog;
