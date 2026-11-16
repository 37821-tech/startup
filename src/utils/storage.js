// LocalStorage state management for AIR+

const STORAGE_KEY = 'air_plus_state_v1';

export const DEFAULT_STATE = {
  user: {
    name: 'Assinante Convidado',
    cpf: '000.000.000-00',
    email: 'membro@airplus.respiro',
    avatarLetter: 'A',
  },
  subscription: {
    planId: 'premium', // 'free' | 'basic' | 'premium' | 'ultra'
    planName: 'AIR PREMIUM',
    price: '49,90',
    billingCycle: 'mensal',
    status: 'Ativo',
    startDate: new Date().toISOString(),
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    turboEnabled: false,
    qualityRating: '99.98% Hi-Res',
  },
  stats: {
    respirationsCount: 14280,
    litersConsumed: 7140, // avg 0.5L per breath
    savedPulmonaryEffort: '34.2%',
    co2FilteredPercentage: '98.7%',
    streakDays: 14,
  },
  preferences: {
    darkMode: true,
    soundEffects: true,
    hapticFeedback: true,
    breathingSpeed: 'normal', // 'zen', 'normal', 'turbo'
  }
};

export function loadState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveState(DEFAULT_STATE);
      return DEFAULT_STATE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      subscription: { ...DEFAULT_STATE.subscription, ...(parsed.subscription || {}) },
      stats: { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) },
      user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) },
      preferences: { ...DEFAULT_STATE.preferences, ...(parsed.preferences || {}) },
    };
  } catch (e) {
    console.error('Error loading AIR+ state from localStorage:', e);
    return DEFAULT_STATE;
  }
}

export function saveState(state) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving AIR+ state to localStorage:', e);
  }
}

export function incrementBreath(count = 1) {
  const current = loadState();
  const newRespirations = current.stats.respirationsCount + count;
  const newLiters = Math.round((current.stats.litersConsumed + count * 0.52) * 10) / 10;
  const updated = {
    ...current,
    stats: {
      ...current.stats,
      respirationsCount: newRespirations,
      litersConsumed: newLiters,
    }
  };
  saveState(updated);
  return updated;
}
