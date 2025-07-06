import { GithubIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-4 border-t border-white/10 bg-[#1e1e2e]">
      <div className="flex items-center justify-center gap-6 text-white text-sm">
        <div className="h-px w-24 bg-white/20" />
        <div className="flex gap-4">
          <a
            href="https://github.com/Mathesh07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/matheshwaran-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
        <div className="h-px w-24 bg-white/20" />
      </div>
    </footer>
  );
};

export default Footer;
