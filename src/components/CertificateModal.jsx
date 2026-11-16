import React, { useRef, useState } from 'react';
import { 
  X, 
  Award, 
  Printer, 
  Check, 
  Copy, 
  Wind, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audio';

export default function CertificateModal({ isOpen, onClose, state }) {
  const [copied, setCopied] = useState(false);
  const certificateRef = useRef(null);

  if (!isOpen) return null;

  const { user, subscription, stats } = state;
  const serialNumber = `AIR-2026-${(stats.respirationsCount % 8999 + 1000).toString()}-VIP`;
  const issueDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleCopyLink = () => {
    playClickSound();
    navigator.clipboard.writeText(`https://airplus.startup/certificado/${serialNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Top Controls */}
        <div className="p-4 px-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Certificado Digital Oficial AIR+</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Design */}
        <div className="p-6 sm:p-12 print:p-0 bg-gradient-to-b from-amber-50/30 via-white to-sky-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
          <div 
            ref={certificateRef}
            className="border-4 border-double border-amber-400/60 dark:border-amber-500/40 p-6 sm:p-12 rounded-2xl relative bg-white dark:bg-slate-900 shadow-inner"
          >
            {/* Corner Filigrees */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500" />

            {/* Header Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-lg mx-auto mb-3">
                <Wind className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-slate-900 dark:text-white uppercase">
                AIR<span className="text-brand-500">+</span> GLOBAL
              </h2>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-1">
                Certificação de Inalação Qualificada
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-3xl font-serif italic text-slate-800 dark:text-slate-100">
                Certificado Oficial de Respirador Habilitado
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
            </div>

            {/* Body Text */}
            <div className="text-center max-w-xl mx-auto space-y-4 mb-8">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Certificamos para todos os fins simbólicos que o ilustre cidadão:
              </p>
              
              <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 tracking-tight py-1 font-serif underline decoration-amber-400/50 underline-offset-8">
                {user.name || 'Assinante Honorário'}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                Encontra-se devidamente matriculado na classe <strong className="text-slate-900 dark:text-white uppercase">{subscription.planName}</strong>, possuindo autorização contratual para inspirar oxigênio ambiente, desfrutar de ar em alta definição e vangloriar-se de um ato que 100% da biosfera realiza gratuitamente.
              </p>
            </div>

            {/* Metrics & Golden Seal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center pt-4 border-t border-slate-200/60 dark:border-slate-800">
              
              <div className="text-center sm:text-left text-xs space-y-1">
                <div className="text-slate-400">Nº de Série Alveolar:</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white">{serialNumber}</div>
                <div className="text-slate-400">Emissão: {issueDate}</div>
              </div>

              {/* The Golden Seal Badge */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-100 dark:from-amber-600 dark:via-amber-500 dark:to-amber-400 p-1 shadow-lg flex items-center justify-center text-slate-900 text-center">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-700/60 flex flex-col items-center justify-center p-1">
                    <Sparkles className="w-4 h-4 text-amber-800 dark:text-amber-950 mb-0.5" />
                    <span className="text-[8px] font-black uppercase leading-tight tracking-tighter text-amber-900 dark:text-amber-950">
                      SELO OFICIAL AIR+ VIP
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right text-xs space-y-1">
                <div className="text-slate-400">Autenticação:</div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">VÁLIDO & PAGO</div>
                <div className="text-slate-400">Status: Exclusivo</div>
              </div>

            </div>

            {/* Slogan */}
            <div className="mt-8 text-center pt-4 border-t border-slate-100 dark:border-slate-850">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">
                "Respirar é essencial. Respirar com exclusividade é AIR+."
              </span>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
          Documento fictício para entretenimento. Não possui validade jurídica, médica ou notarial.
        </div>

      </div>
    </div>
  );
}
