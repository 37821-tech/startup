import React from 'react';
import { Wind, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Footer({ onScrollToTop }) {
  const scrollTo = (href) => {
    playClickSound();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-md">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                AIR<span className="text-brand-500">+</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              AIR+ — Transformando o gratuito em extraordinariamente caro.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A pioneira mundial em SaaS atmosférico (Sub-alveolar as a Service). Monetizando a biosfera terrestre uma inspiração de cada vez.
            </p>

            <div className="pt-2 text-xs text-brand-400 font-mono">
              Slogan oficial: "Respirar é essencial. Respirar com exclusividade é AIR+."
            </div>
          </div>

          {/* Col 1: Produto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Produto
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('#simulador')} className="hover:text-white transition-colors">
                  Simulador 8K
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#planos')} className="hover:text-white transition-colors">
                  Planos & Assinaturas
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#dashboard')} className="hover:text-white transition-colors">
                  Dashboard de Telemetria
                </button>
              </li>
              <li>
                <span className="text-slate-600 cursor-not-allowed">
                  API de Traqueia (Beta)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 2: Corporativo */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('#manifesto')} className="hover:text-white transition-colors">
                  Manifesto AIR+
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#investidores')} className="hover:text-white transition-colors">
                  Relações com Investidores
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#faq')} className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </button>
              </li>
              <li>
                <span className="text-slate-600 cursor-not-allowed">
                  Vagas para Pulmões
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Jurídico Satírico */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Governança
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-300">Termos de Inalação</li>
              <li className="hover:text-slate-300">Política de Retenção de O2</li>
              <li className="hover:text-slate-300">LGPD Alveolar</li>
              <li className="hover:text-slate-300">Auditoria Atmosférica</li>
            </ul>
          </div>

        </div>

        {/* Required Mandatory Disclaimer Notice */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Aviso Legal de Sátira</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            "Projeto fictício e humorístico. Nenhuma assinatura fornece ar, oxigênio ou benefícios médicos reais."
          </p>
          <p className="text-[11px] text-slate-500 mt-2 max-w-2xl mx-auto">
            Este site é uma paródia inteligente de startups de tecnologia, monetização abusiva e cultura SaaS moderna. Não pague dinheiro real por ar a menos que esteja mergulhando em alto-mar com escafandro.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} AIR+ Technologies Inc. Todos os direitos de respiração reservados (ficticiamente).
          </div>

          <button
            onClick={() => {
              playClickSound();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
