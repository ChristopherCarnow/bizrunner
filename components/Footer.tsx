import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6 text-sm">
        <div className="flex flex-col gap-1 items-center">
        <p>&copy; {new Date().getFullYear()} BizRunner (Pty) LTD</p>
        <p className="text-xs opacity-60">Designed by Forester Web Studio</p>
        </div>
        <div className="flex gap-6"></div>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
    </footer>
  );
};