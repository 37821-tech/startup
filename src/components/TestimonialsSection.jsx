import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos",
      age: 32,
      role: "Assinante AIR ULTRA",
      quote: "Antes eu respirava de graça. Hoje pago R$ 99,90 e continuo respirando. Recomendo!",
      avatarGradient: "from-brand-500 to-sky-600",
      rating: 5,
      breathsRecorded: "1.2M inspirações"
    },
    {
      name: "Mariana",
      age: 27,
      role: "Assinante AIR PREMIUM",
      quote: "Não percebi nenhuma diferença, mas o aplicativo é muito bonito.",
      avatarGradient: "from-purple-500 to-indigo-600",
      rating: 5,
      breathsRecorded: "840K inspirações"
    },
    {
      name: "Roberto",
      age: 41,
      role: "Assinante AIR ULTRA",
      quote: "Desde que assinei o AIR+, nunca mais fiquei sem respirar. Incrível!",
      avatarGradient: "from-emerald-500 to-teal-600",
      rating: 5,
      breathsRecorded: "2.4M inspirações"
    },
    {
      name: "Bia",
      age: 24,
      role: "Creator de Lifestyle",
      quote: "O ar do AIR+ combina perfeitamente com a estética minimalista da minha sala de estar. Minha postura melhorou 0%, mas meu engajamento subiu.",
      avatarGradient: "from-pink-500 to-rose-600",
      rating: 5,
      breathsRecorded: "620K inspirações"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% dos Depoimentos São Fictícios</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Amado por quem tem dinheiro sobrando
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Veja o que dizem nossos membros que decidiram transformar a sobrevivência biológica em uma despesa fixa de cartão de crédito.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel glass-card-hover rounded-3xl p-7 flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base font-normal text-slate-700 dark:text-slate-200 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarGradient} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                  {t.name[0]}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}, {t.age} anos
                    </span>
                  </div>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Satire Badge */}
        <div className="mt-12 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Depoimentos satíricos gerados para fins cômicos. Ninguém foi prejudicado respirando.
          </span>
        </div>

      </div>
    </section>
  );
}
