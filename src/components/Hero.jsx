import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  Flame,
  CheckCircle2,
  Atom
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Hero({ 
  onScrollToSimulator, 
  onScrollToPlans,
  onOpenCheckout 
}) {
  // Counter that realistically increments every second
  const [globalBreaths, setGlobalBreaths] = useState(14892318);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalBreaths((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-brand-400/20 via-sky-300/15 to-transparent rounded-full blur-3xl pointer-events-none dark:from-brand-600/20 dark:via-cyan-500/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50/80 dark:bg-slate-900/80 border border-brand-200 dark:border-brand-800/60 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
            <span className="text-xs font-semibold text-brand-900 dark:text-brand-300">
              Série B Concluída: US$ 140M para monetizar o ar ambiente
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              99.9% Margem Bruta
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Você respira de graça? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Que ultrapassado.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            Conheça a primeira plataforma de assinatura de ar do mundo. Transformamos cada inspiração em uma experiência exclusiva, personalizada e completamente desnecessária.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
            <button
              onClick={() => {
                playClickSound();
                onScrollToSimulator();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-semibold text-base shadow-xl shadow-brand-500/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <Wind className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Começar a respirar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onScrollToPlans();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 text-slate-800 dark:text-slate-100 font-semibold text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Conhecer os planos</span>
            </button>
          </div>

          {/* Live Atmospheric Counter */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-brand-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-brand-400/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
              <Activity className="w-4 h-4 animate-pulse text-brand-500" />
              <span>Contador Global de Inalações Monetizadas</span>
            </div>

            <div className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono mb-2">
              {globalBreaths.toLocaleString('pt-BR')}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Respirações exclusivas realizadas por membros pagantes em mais de 140 países (simuladas em tempo real).
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Taxa de Sobrevivência
              </span>
              <span className="flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-brand-500" /> 0.00ms Latência Pulmonar
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> Sem Glúten & Zero Lactose
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
