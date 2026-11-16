import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function PricingSection({ currentPlanId, onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const plans = [
    {
      id: 'basic',
      name: 'AIR BASIC',
      priceMonthly: '19,90',
      priceAnnual: '15,90',
      tagline: 'Para quem está começando a levar a respiração a sério.',
      popular: false,
      color: 'slate',
      badge: 'Entrada',
      benefits: [
        'Direito simbólico de respirar 24 horas por dia.',
        'Certificado digital de respirador.',
        'Acesso ao aplicativo AIR+.',
        'Estatísticas fictícias de inspiração.',
        'Suporte respiratório por chatbot.'
      ],
      disclaimer: 'Não inclui oxigênio físico real.'
    },
    {
      id: 'premium',
      name: 'AIR PREMIUM',
      priceMonthly: '49,90',
      priceAnnual: '39,90',
      tagline: 'Porque seus pulmões merecem mais.',
      popular: true,
      color: 'brand',
      badge: 'MAIS POPULAR',
      benefits: [
        'Todos os benefícios do Basic.',
        'Respiração em qualidade Full HD.',
        'Oxigênio imaginário com tecnologia 4K.',
        'Modo Respiração Turbo.',
        'Sons relaxantes durante a respiração.',
        'Badge digital de Respirador VIP.'
      ],
      disclaimer: 'Recomendado por 9 em cada 10 marqueteiros.'
    },
    {
      id: 'ultra',
      name: 'AIR ULTRA',
      priceMonthly: '99,90',
      priceAnnual: '79,90',
      tagline: 'Você não respira. Você vive uma experiência.',
      popular: false,
      color: 'gold',
      badge: 'EXCLUSIVIDADE MÁXIMA',
      benefits: [
        'Todos os benefícios do Premium.',
        'Respiração em 8K Ultra HD.',
        'Prioridade fictícia na fila do oxigênio.',
        'Acesso ao Ar Gourmet.',
        'Inteligência artificial que avalia suas respirações.',
        'Certificado de Pulmão Premium.',
        'Atendimento VIP 24 horas.'
      ],
      disclaimer: 'Prioridade imaginária no fluxo atmosférico.'
    }
  ];

  return (
    <section id="planos" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3 block">
            Planos de Assinatura Atmosférica
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
            Escolha o nível de luxo dos seus pulmões
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Três categorias meticulosamente precificadas para transformar um reflexo biológico involuntário em um débito recorrente no seu cartão.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                playClickSound();
                setBillingCycle('monthly');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faturamento Mensal
            </button>
            <button
              onClick={() => {
                playClickSound();
                setBillingCycle('annual');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Plano Anual</span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isSelected = currentPlanId === plan.id;
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-900 border-2 border-brand-500 dark:border-brand-400 shadow-2xl shadow-brand-500/15 lg:-translate-y-3'
                    : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-sky-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    {plan.id === 'ultra' && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                        8K Ultra
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 min-h-[40px] mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">R$</span>
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {price}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      /mês
                    </span>
                  </div>

                  {/* Benefit list */}
                  <div className="space-y-3.5 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      O que está incluído:
                    </div>
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${
                          plan.popular 
                            ? 'bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectPlan(plan, billingCycle);
                    }}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                        : plan.popular
                        ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white shadow-lg shadow-brand-500/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{isSelected ? 'Plano Atual Ativo' : `Assinar ${plan.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
                    Demonstração fictícia • Sem cobrança real
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>Garantia de 30 dias: Se você parar de respirar por insatisfação com a marca, devolvemos 100% do seu dinheiro simulado.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
