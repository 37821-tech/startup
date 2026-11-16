import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Award, 
  CheckCircle,
  Flame,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playInhaleSound, playExhaleSound, playClickSound } from '../utils/audio';

export default function BreathingSimulator({ onBreathCompleted }) {
  const [mode, setMode] = useState('premium'); // 'normal' | 'premium' | 'ultra'
  const [phase, setPhase] = useState('inhale'); // 'inhale' | 'hold' | 'exhale'
  const [isRunning, setIsRunning] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [feedbackQuote, setFeedbackQuote] = useState('Respiração premium ativada. Seus pulmões agora são membros VIP.');

  const quotes = {
    normal: [
      'Você inalou ar padrão. Eficiente, mas desprovido de prestígio.',
      'Respiração concluída. Nenhuma taxa adicional foi cobrada (ainda).',
      'Ar genérico detectado. Considere atualizar para o plano Premium para melhor status.'
    ],
    premium: [
      'Parabéns! Você acabou de respirar com tecnologia de última geração.',
      'Seu ar foi atualizado com sucesso para Full HD 60fps.',
      'Respiração premium ativada. Seus pulmões agora são membros VIP.',
      'Nitrogênio comprimido com carinho suíço nos seus alvéolos.',
      'Pureza molecular certificada por consultores imaginários.'
    ],
    ultra: [
      'EXPERIÊNCIA 8K ALCANÇADA: Oxigênio gourmet com micropartículas de prestígio.',
      'Prioridade máxima na atmosfera! Você respirou antes de 4.000 pessoas.',
      'Alvéolos sincronizados com a nuvem quântica da AIR+.',
      'Respiração Ultra 8K finalizada. Nível de elegância respiratória: 100%.',
      'Você não apenas respirou, você protagonizou um momento corporativo inesquecível.'
    ]
  };

  const timerRef = useRef(null);

  // Breathing loop: Inhale 4s -> Hold 2s -> Exhale 4s
  useEffect(() => {
    if (!isRunning) return;

    if (phase === 'inhale') {
      playInhaleSound(mode);
    } else if (phase === 'exhale') {
      playExhaleSound(mode);
    }

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Switch phase
          if (phase === 'inhale') {
            setPhase('hold');
            return 2;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            // Completed 1 cycle
            setPhase('inhale');
            setCycleCount((c) => c + 1);
            if (onBreathCompleted) onBreathCompleted(1);

            // Random witty quote
            const list = quotes[mode];
            const nextQuote = list[Math.floor(Math.random() * list.length)];
            setFeedbackQuote(nextQuote);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, phase, mode]);

  // Handle immediate manual breath
  const handleQuickBreath = () => {
    playClickSound();
    playInhaleSound(mode);
    if (onBreathCompleted) onBreathCompleted(1);
    const list = quotes[mode];
    setFeedbackQuote(list[Math.floor(Math.random() * list.length)]);
  };

  // Styling based on mode
  const getOrbTheme = () => {
    switch (mode) {
      case 'ultra':
        return {
          gradient: 'from-amber-400 via-rose-500 to-indigo-600',
          glow: 'rgba(244, 63, 94, 0.4)',
          shadow: 'shadow-[0_0_80px_rgba(244,63,94,0.35)]',
          badgeText: 'Qualidade 8K Ultra HDR',
          accent: 'text-amber-400',
          bgRing: 'border-amber-500/30'
        };
      case 'premium':
        return {
          gradient: 'from-brand-500 via-sky-400 to-cyan-300',
          glow: 'rgba(14, 165, 233, 0.4)',
          shadow: 'shadow-[0_0_70px_rgba(14,165,233,0.35)]',
          badgeText: 'Qualidade Full HD 4K',
          accent: 'text-brand-400',
          bgRing: 'border-brand-500/30'
        };
      default: // normal
        return {
          gradient: 'from-slate-400 to-slate-600',
          glow: 'rgba(148, 163, 184, 0.2)',
          shadow: 'shadow-[0_0_40px_rgba(148,163,184,0.2)]',
          badgeText: 'Qualidade 480p Padrão',
          accent: 'text-slate-400',
          bgRing: 'border-slate-500/20'
        };
    }
  };

  const orbTheme = getOrbTheme();

  // Phase instructional label
  const getPhaseText = () => {
    if (phase === 'inhale') return 'Inspire Exclusividade...';
    if (phase === 'hold') return 'Retenha o Ar Patenteado';
    return 'Expire Suavemente';
  };

  // Scale computation for breathing animation
  const getScale = () => {
    if (phase === 'inhale') return 'scale-125';
    if (phase === 'hold') return 'scale-120';
    return 'scale-90';
  };

  return (
    <section id="simulador" className="py-20 md:py-32 relative overflow-hidden bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3 block">
            Interface Bio-Sincronizada
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Simulador de Respiração Premium
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Experimente a diferença entre uma inalação plebéia e uma experiência sub-alveolar de alta fidelidade.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => {
                playClickSound();
                setMode('normal');
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'normal'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Respiração Normal
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMode('premium');
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                mode === 'premium'
                  ? 'bg-gradient-to-r from-brand-600 to-sky-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Respiração Premium</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMode('ultra');
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                mode === 'ultra'
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md shadow-rose-500/25'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Respiração Ultra 8K</span>
            </button>
          </div>
        </div>

        {/* The Breathing Stage */}
        <div className="max-w-xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center relative shadow-2xl">
          
          {/* Top Stage Indicators */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-8 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              {isRunning ? 'Sensor Atmosférico Ativo' : 'Simulação Pausada'}
            </span>
            <span className="font-mono">{orbTheme.badgeText}</span>
          </div>

          {/* Interactive Breathing Sphere Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center my-6">
            
            {/* Outer harmonic rings */}
            <div className={`absolute inset-0 rounded-full border-2 ${orbTheme.bgRing} animate-ping opacity-25`} style={{ animationDuration: '4s' }} />
            <div className={`absolute -inset-4 rounded-full border ${orbTheme.bgRing} opacity-40`} />
            <div className={`absolute -inset-8 rounded-full border border-dashed ${orbTheme.bgRing} opacity-20 animate-spin`} style={{ animationDuration: '30s' }} />

            {/* Breathing Animated Sphere */}
            <div
              className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr ${orbTheme.gradient} ${orbTheme.shadow} transition-transform duration-[3800ms] ease-in-out flex items-center justify-center text-white cursor-pointer select-none ${getScale()}`}
              onClick={handleQuickBreath}
            >
              <div className="text-center px-4">
                <Wind className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 animate-pulse opacity-90" />
                <div className="text-sm sm:text-base font-bold tracking-tight">
                  {getPhaseText()}
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono mt-1">
                  {secondsRemaining}s
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Satirical Quote Banner */}
          <div className="mt-8 p-4 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 min-h-[72px] flex items-center justify-center">
            <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 animate-fade-in transition-all">
              "{feedbackQuote}"
            </p>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                setIsRunning(!isRunning);
              }}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pausar Respiração' : 'Retomar Inalação'}</span>
            </button>

            <button
              onClick={handleQuickBreath}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 transition-colors shadow-md shadow-brand-500/20"
            >
              <Zap className="w-4 h-4" />
              <span>Inalar Ar Turbo (+1)</span>
            </button>

            <div className="text-xs text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg bg-slate-100/50 dark:bg-slate-850/50">
              Ciclos Concluídos: <strong className="text-slate-900 dark:text-white font-mono">{cycleCount}</strong>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
            Dica: Toque na esfera para forçar uma inalação instantânea de ar calibrado.
          </p>

        </div>

      </div>
    </section>
  );
}
