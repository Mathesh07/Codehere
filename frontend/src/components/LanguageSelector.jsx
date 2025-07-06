import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { LANGUAGE_CONFIG } from "../constants";

const LANGUAGES = [
  { id: 54, name: "C++", key: "cpp" },
  { id: 62, name: "Java", key: "java" },
  { id: 71, name: "Python", key: "python" },
  { id: 63, name: "JavaScript", key: "javascript" },
];



const LanguageSelector = () => {
  const { language, setLanguage } = useCodeEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setLanguage(lang.key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-48" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between bg-[#1e1e2e] text-white rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
      >
        {LANGUAGES.find(l => l.key === language)?.name ?? language}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-[#1e1e2e] border border-[#313244] rounded-lg shadow-xl"
          >
            {LANGUAGES.map((lang, index) => (
              <motion.li
                key={lang.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleSelect(lang)}
                  className={`w-full text-left px-4 py-2.5 text-sm rounded-md transition-all duration-200 ${language === lang.key ? "bg-blue-500/20 text-blue-300" : "text-gray-200 hover:bg-gray-700"
                    }`}
                >
                  {lang.name}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div >
  );
};

export default LanguageSelector;
