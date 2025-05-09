import { Code } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-8 px-4 border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col  items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Code className="text-cyan-400 text-2xl" />
            <span className="text-xl font-semibold">Shaqib.dev</span>
          </div>
          <p className="max-w-xs text-sm text-gray-300">
            Empowering the web with clean code, creative designs, and modern tech.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Shaqib.dev. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
