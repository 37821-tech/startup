import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "O que acontece se eu cancelar minha assinatura?",
      a: "Absolutamente nada. Você continuará respirando normalmente."
    },
    {
      q: "O ar é realmente diferente?",
      a: "Fisicamente, não. Em termos de experiência de marca, absolutamente."
    },
    {
      q: "Posso respirar sem pagar?",
      a: "Sim, mas por que abrir mão de uma experiência premium?"
    },
    {
      q: "A AIR+ fornece oxigênio de verdade?",
      a: "Não. Somos uma startup fictícia e nosso produto é uma sátira."
    },
    {
      q: "Posso transferir minhas respirações não utilizadas para o próximo mês?",
      a: "Infelizmente o ar expira a cada 4 segundos. Respirações não realizadas são devolvidas para a atmosfera pública comum sem direito a estorno fiscal ou compensação de CO2."
    },
    {
      q: "Se o oxigênio do planeta acabar, os assinantes Ultra têm prioridade?",
      a: "Nossos advogados nos orientaram a esclarecer que todos morrerão juntos, porém os assinantes Ultra terão um certificado digital com carimbo dourado comprovando que respiraram com status até o último milissegundo."
    }
  ];

  const handleToggle = (index) => {
    playClickSound();
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Tudo o que você precisa saber antes de assinar o ar que você já respira de graça desde o nascimento.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-brand-500/40 dark:border-brand-500/40 shadow-lg shadow-brand-500/5'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
