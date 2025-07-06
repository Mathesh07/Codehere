import { useState } from "react";
import { Link } from "react-router-dom";
import { Blocks, Code2,Gpu } from "lucide-react";

import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";

function Header() {
  const [isPro, setIsPro] = useState(false);

  const handleRun = () => {
    console.log("Run button clicked!");
  };

  return (
    <div className="relative z-10 w-full flex justify-center px-4 mt-4">
      <div className="flex items-center lg:justify-between justify-center bg-[#0f1117]/90 backdrop-blur-xl p-6 mb-4 rounded-lg shadow-lg border border-white/5 w-full max-w-[1400px]">
        {/* Left */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
              <Gpu className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                CodeHere
              </span>

            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-[#151a22]/80 hover:bg-blue-500/10 border border-[#1f2630] hover:border-blue-500/50 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Saved
              </span>
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={isPro} />
          </div>
          <RunButton onClick={handleRun} />
        </div>
      </div>
    </div>
  );
}

export default Header;
