import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Lock, 
  Wind,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audio';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  billingCycle = 'monthly',
  onSubscriptionSuccess 
}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'pix' | 'lung'
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const plan = selectedPlan || {
    id: 'premium',
    name: 'AIR PREMIUM',
    priceMonthly: '49,90',
    priceAnnual: '39,90',
  };

  const basePrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    playClickSound();
    if (promoCode.trim().length > 0) {
      setPromoApplied(true);
    }
  };

  const handleSubmitSubscription = (e) => {
    e.preventDefault();
    playClickSound();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playSuccessChime();

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      if (onSubscriptionSuccess) {
        onSubscriptionSuccess({
          planId: plan.id,
          planName: plan.name,
          price: basePrice,
          userName: userName || 'Assinante Exclusivo',
          email: userEmail || 'membro@airplus.respiro',
          billingCycle
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Checkout Simulado • Demonstração</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Assinar {plan.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Adicione oxigênio monetizado à sua rotina mensal sem cobrança real.
              </p>
            </div>

            {/* Plan Summary Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{plan.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Ciclo {billingCycle === 'annual' ? 'Anual' : 'Mensal'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black font-mono text-brand-600 dark:text-brand-400">
                  R$ {basePrice}/mês
                </div>
                <div className="text-[10px] text-slate-400">Cancelamento a qualquer hora</div>
              </div>
            </div>

            <form onSubmit={handleSubmitSubscription} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Seu Nome de Respirador
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dra. Ana Luiza"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  E-mail de Notificação Alveolar
                </label>
                <input
                  type="email"
                  required
                  placeholder="ana@exclusivo.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Payment Option Selector (satirical) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Método de Pagamento Fictício
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('card'); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Cartão
                  </button>
                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('pix'); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'pix'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" /> Pix Astral
                  </button>
                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('lung'); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'lung'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" /> Permuta
                  </button>
                </div>
              </div>

              {/* Promo code field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cupom: ARGRATIS"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold"
                >
                  Aplicar
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-amber-500 font-medium">
                  Cupom aceito! O ar continua custando exatamente o mesmo valor simbólico.
                </p>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Sincronizando alvéolos com a nuvem...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirmar Assinatura Fictícia</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulação 100% gratuita • Nenhum dado financeiro coletado</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              Bem-vindo ao Clube da Respiração Paga!
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-6">
              Parabéns, <strong>{userName || 'Membro VIP'}</strong>. Seu plano <strong>{plan.name}</strong> está oficialmente ativo. Seus pulmões agora possuem direito contratual à atmosfera.
            </p>

            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-xs text-brand-800 dark:text-brand-300 font-medium mb-6">
              "A partir deste segundo, você não apenas sobrevive: você usufrui de uma assinatura de prestígio."
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                  const dash = document.querySelector('#dashboard');
                  if (dash) dash.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Ver Minha Telemetria no Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Fechar janela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
