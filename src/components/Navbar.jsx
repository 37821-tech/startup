import React, { useState } from 'react';
import { 
  Wind, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Navbar({ 
  isDarkMode, 
  setIsDarkMode, 
  isMuted, 
  toggleAudioMute, 
  subscription,
  onOpenCheckout,
  onOpenDashboard 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Conceito', href: '#manifesto' },
    { label: 'Planos', href: '#planos' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Investidores', href: '#investidores' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-300 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Wind className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-400 border-2 border-white dark:border-slate-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                AIR<span className="text-brand-500">+</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                SaaS
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-tight hidden sm:inline">
              Subscription as a Service
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-850/80 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              playClickSound();
              toggleAudioMute();
            }}
            title={isMuted ? "Ativar áudio ambiente" : "Mutar áudio ambiente"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-brand-500" />}
          </button>

          {/* Theme toggle button */}
          <button
            onClick={() => {
              playClickSound();
              setIsDarkMode(!isDarkMode);
            }}
            title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* User status badge / Quick CTA */}
          <button
            onClick={() => {
              playClickSound();
              onOpenDashboard();
            }}
            className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{subscription?.planName || 'AIR BASIC'}</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onOpenCheckout();
            }}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-semibold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 shadow-md shadow-brand-500/25 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Assinar Ar</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200"
              >
                Acessar Meu Painel de Respirações
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
