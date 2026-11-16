import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe2, 
  Percent, 
  DollarSign, 
  Briefcase, 
  Target, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function InvestorSection() {
  const investorMetrics = [
    {
      label: "Clientes em Potencial",
      value: "8 Bilhões",
      description: "Base de usuários ativa no planeta Terra sem custo de aquisição primário.",
      icon: Users,
      color: "text-brand-500"
    },
    {
      label: "Necessidade Humana",
      value: "100%",
      description: "0% de taxa de churn biológica voluntária em caso de retenção de produto.",
      icon: Target,
      color: "text-rose-500"
    },
    {
      label: "Mercado Total Endereçável (TAM)",
      value: "Todo Mundo",
      description: "Literalmente qualquer organismo com pulmões ou guelras com poder aquisitivo.",
      icon: Globe2,
      color: "text-emerald-500"
    },
    {
      label: "Inovação no Produto Físico",
      value: "0%",
      description: "As moléculas de O2 são exatamente idênticas às do período Jurássico.",
      icon: Percent,
      color: "text-amber-500"
    },
    {
      label: "Confiança no Marketing",
      value: "100%",
      description: "Landing page bonita, tipografia elegante e termos de uso em latim.",
      icon: Sparkles,
      color: "text-purple-500"
    },
    {
      label: "Margem Bruta Projetada",
      value: "99.99%",
      description: "Custo de mercadoria vendida (COGS): R$ 0,00 por metro cúbico.",
      icon: DollarSign,
      color: "text-cyan-500"
    }
  ];

  const fakeInvestors = [
    { name: "Sequoia Oxygen", fund: "Fundo Atmosférico I", invested: "US$ 60M" },
    { name: "Andreessen Alveolus", fund: "Seed Alveolar Tech", invested: "US$ 45M" },
    { name: "SoftLung Vision Fund", fund: "Global Breathing Series B", invested: "US$ 35M" },
  ];

  return (
    <section id="investidores" className="py-20 md:py-32 relative bg-slate-900 text-white overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
            <span>Relações com Investidores • Série B</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            O futuro da respiração já começou.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Quando Steve Jobs colocou 1.000 músicas no seu bolso, o mundo aplaudiu. Nós colocamos uma assinatura mensal na sua traqueia.
          </p>
        </div>

        {/* The Golden Quote Box */}
        <div className="max-w-4xl mx-auto mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-950 via-slate-850 to-brand-950 border border-brand-500/30 text-center shadow-2xl relative">
          <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-white to-sky-200 tracking-tight leading-snug">
            "Não inventamos o ar. Inventamos uma maneira de cobrar por ele."
          </div>
          <div className="mt-4 text-xs font-mono uppercase tracking-widest text-brand-400">
            Tese de Investimento da AIR+ • Apresentação aos Acionistas
          </div>
        </div>

        {/* Absurd Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {investorMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div 
                key={i}
                className="rounded-2xl p-6 bg-slate-800/60 border border-slate-700/60 backdrop-blur-md hover:border-brand-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {metric.label}
                    </span>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-3">
                    {metric.value}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-slate-700/60">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mock Pitch Deck Cap Table */}
        <div className="rounded-3xl p-8 bg-slate-800/40 border border-slate-800 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-400" />
                <span>Principais Fundos Participantes da Rodada Série B</span>
              </h3>
              <p className="text-xs text-slate-400">
                Avaliação pré-money fictícia: US$ 42.000.000.000,00
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800">
              Rodada 100% Subscrita Ficticiamente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fakeInvestors.map((inv, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{inv.name}</div>
                  <div className="text-xs text-slate-400">{inv.fund}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-brand-400">{inv.invested}</div>
                  <div className="text-[10px] text-slate-500">Participação</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
