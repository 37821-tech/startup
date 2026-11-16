import React from 'react';
import { 
  CloudLightning, 
  Cpu, 
  Layers, 
  Sparkles, 
  Zap, 
  Sliders, 
  Crown,
  Maximize2
} from 'lucide-react';

export default function BrandManifesto() {
  const pillars = [
    {
      icon: Cpu,
      title: "Algoritmo Pulmonar Proprietário",
      description: "Nosso software patenteado recalcula a física das suas moléculas de ar a cada 4 milissegundos para garantir que nenhuma respiração seja vulgar."
    },
    {
      icon: Crown,
      title: "Status Social Involuntário",
      description: "Você já respirou ao lado de pessoas que respiram de graça? A sensação de superioridade alveolar do AIR+ é imediata e clinicamente irrefutável."
    },
    {
      icon: Sliders,
      title: "Customização Alveolar Dinâmica",
      description: "Escolha entre densidade aeróbica relaxante, fluxo de ar corporativo e oxigênio para tomadas de decisão em reuniões do Zoom."
    },
    {
      icon: Zap,
      title: "0% Inovação Física, 100% Lucro",
      description: "Não alteramos a composição química do planeta. Alteramos a sua percepção de valor. É a evolução definitiva do capitalismo digital."
    }
  ];

  return (
    <section id="manifesto" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3 block">
            A Disrupção do Óbvio
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Respirar é essencial. <br />
            <span className="bg-gradient-to-r from-brand-500 to-sky-400 bg-clip-text text-transparent">
              Respirar com exclusividade é AIR+.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Durante 300.000 anos, os seres humanos inalaram misturas genéricas de nitrogênio e oxigênio sem pagar um único centavo. Nós identificamos essa grave ineficiência de mercado e a transformamos em uma oportunidade recorrente de faturamento.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="glass-panel glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Tecnologia patenteada</span>
                  <span className="ml-auto">v4.2</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-8 sm:p-12 border border-brand-800/40 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-4 border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visão dos Fundadores</span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium tracking-tight leading-snug mb-4">
              "A água engarrafada provou que as pessoas pagariam pelo que cai do céu. Nós apenas eliminamos a garrafa e aceleramos o ciclo de cobrança."
            </blockquote>
            <p className="text-sm text-brand-200/80 font-mono">
              — Conselho de Inovação Disruptiva da AIR+
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
