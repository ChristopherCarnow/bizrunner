import React, { useState, useEffect } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { SectionId } from '../types';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', id: SectionId.SERVICES },
    { label: 'About Us', id: SectionId.ABOUT },
    { label: 'Contact', id: SectionId.CONTACT },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => scrollToSection(SectionId.HOME)}
        >
          <div className="bg-brand-600 p-2 rounded-lg transition-colors">
            <Truck className="text-white w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-brand-950' : 'text-brand-950 md:text-white'}`}>
            BIZ<span className="text-brand-600">RUNNER</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-semibold transition-colors uppercase tracking-wide ${isScrolled ? 'text-slate-600 hover:text-brand-600' : 'text-slate-200 hover:text-white'}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-lg hover:shadow-xl"
          >
            GET QUOTE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-slate-800' : 'text-brand-900'}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileOpen(false);
              }}
              className="text-left text-lg font-semibold text-slate-700 hover:text-brand-600"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection(SectionId.CONTACT);
              setIsMobileOpen(false);
            }}
            className="bg-brand-600 text-white px-5 py-3 rounded-md font-bold text-center"
          >
            REQUEST A QUOTE
          </button>
        </div>
      )}
    </nav>
  );
};