import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import BrandManifesto from './components/BrandManifesto';
import PricingSection from './components/PricingSection';
import BreathingSimulator from './components/BreathingSimulator';
import DashboardSection from './components/DashboardSection';
import TestimonialsSection from './components/TestimonialsSection';
import InvestorSection from './components/InvestorSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import CertificateModal from './components/CertificateModal';

import { loadState, saveState, incrementBreath } from './utils/storage';
import { toggleMute, getIsMuted, playSuccessChime, playClickSound } from './utils/audio';

export default function App() {
  const [appState, setAppState] = useState(() => loadState());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('air_theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark mode for high-tech aesthetic
    }
    return true;
  });
  const [isMuted, setIsMuted] = useState(false);

  // Modals state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Sync theme with html class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('air_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('air_theme', 'light');
    }
  }, [isDarkMode]);

  // Audio mute handler
  const handleToggleAudioMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  // Breathing completed in simulator
  const handleBreathCompleted = (count = 1) => {
    const updated = incrementBreath(count);
    setAppState(updated);
  };

  // Toggle Turbo mode in dashboard
  const handleToggleTurbo = () => {
    setAppState((prev) => {
      const nextTurbo = !prev.subscription.turboEnabled;
      const updated = {
        ...prev,
        subscription: {
          ...prev.subscription,
          turboEnabled: nextTurbo,
          qualityRating: nextTurbo ? '99.999% Ultra Turbo 8K' : '99.98% Hi-Res'
        }
      };
      saveState(updated);
      return updated;
    });
  };

  // Plan selected from pricing section
  const handleSelectPlan = (plan, cycle) => {
    setSelectedPlanForCheckout(plan);
    setBillingCycle(cycle);
    setCheckoutModalOpen(true);
  };

  // Subscription confirmed in checkout modal
  const handleSubscriptionSuccess = (details) => {
    setAppState((prev) => {
      const updated = {
        ...prev,
        user: {
          ...prev.user,
          name: details.userName || prev.user.name,
          email: details.email || prev.user.email,
        },
        subscription: {
          ...prev.subscription,
          planId: details.planId,
          planName: details.planName,
          price: details.price,
          billingCycle: details.billingCycle,
          status: 'Ativo',
          turboEnabled: details.planId === 'ultra',
          qualityRating: details.planId === 'ultra' ? '99.999% Ultra 8K' : details.planId === 'premium' ? '99.98% Full HD' : '99.90% Standard'
        }
      };
      saveState(updated);
      return updated;
    });
  };

  // Smooth scroll helpers
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white relative transition-colors duration-300">
      
      {/* Interactive Particle Atmosphere */}
      <ParticleBackground isDarkMode={isDarkMode} breathingIntensity={appState.subscription.turboEnabled ? 1.4 : 1.0} />

      {/* Main Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMuted={isMuted}
        toggleAudioMute={handleToggleAudioMute}
        subscription={appState.subscription}
        onOpenCheckout={() => {
          setSelectedPlanForCheckout(null);
          setCheckoutModalOpen(true);
        }}
        onOpenDashboard={() => scrollToSection('#dashboard')}
      />

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onScrollToSimulator={() => scrollToSection('#simulador')}
          onScrollToPlans={() => scrollToSection('#planos')}
          onOpenCheckout={() => {
            setSelectedPlanForCheckout(null);
            setCheckoutModalOpen(true);
          }}
        />

        {/* 2. Brand Manifesto */}
        <BrandManifesto />

        {/* 3. Pricing Section */}
        <PricingSection
          currentPlanId={appState.subscription.planId}
          onSelectPlan={handleSelectPlan}
        />

        {/* 4. Interactive Breathing Simulator */}
        <BreathingSimulator
          onBreathCompleted={handleBreathCompleted}
        />

        {/* 5. User Dashboard & Recharts Telemetry */}
        <DashboardSection
          state={appState}
          onToggleTurbo={handleToggleTurbo}
          onOpenCertificate={() => setCertificateModalOpen(true)}
          onOpenCheckout={() => {
            setSelectedPlanForCheckout(null);
            setCheckoutModalOpen(true);
          }}
          onAddManualBreath={() => handleBreathCompleted(1)}
          isDarkMode={isDarkMode}
        />

        {/* 6. Satirical Testimonials */}
        <TestimonialsSection />

        {/* 7. Investor Relations & Series B Valuation */}
        <InvestorSection />

        {/* 8. Interactive FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        selectedPlan={selectedPlanForCheckout}
        billingCycle={billingCycle}
        onSubscriptionSuccess={handleSubscriptionSuccess}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        state={appState}
      />

    </div>
  );
}
