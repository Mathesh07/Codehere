// Snippets.jsx
import React, { useEffect, useState } from "react";
import { Clipboard, Trash } from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../components/Footer"; // Adjust the import path as needed

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("snippets") || "[]");
    setSnippets(stored);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
  };

  const handleDelete = (id) => {
    const updated = snippets.filter((s) => s.id !== id);
    localStorage.setItem("snippets", JSON.stringify(updated));
    setSnippets(updated);
    toast.success("Snippet deleted");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Content */}
      <main className="flex-grow p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Saved Snippets</h1>
        {snippets.length === 0 ? (
          <p className="text-gray-400">No snippets found.</p>
        ) : (
          <div className="grid gap-4">
            {snippets.map((s) => (
              <div
                key={s.id}
                className="bg-[#1e1e2e] p-4 rounded-lg border border-[#313244]"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">{s.title}</h2>
                  <div className="flex gap-2">
                    <Clipboard
                      className="w-5 h-5 cursor-pointer text-blue-400 hover:text-blue-300"
                      onClick={() => handleCopy(s.code)}
                    />
                    <Trash
                      className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(s.id)}
                    />
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-sm bg-[#181825] p-3 rounded-lg overflow-x-auto">
                  {s.code}
                </pre>
                <p className="text-xs text-gray-500 mt-1">
                  Language: {s.language} | Saved on:{" "}
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
};

export default Snippets;
