// Web Audio API ambient synthesizer for AIR+
// Generates airy tones, inhalation/exhalation sounds, and interface chimes without any external audio files.

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute() {
  isMuted = !isMuted;
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}

// Inhale sound: smooth rising filtered harmony
export function playInhaleSound(mode = 'normal') {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  const baseFreq = mode === 'ultra' ? 329.63 : mode === 'premium' ? 261.63 : 220; // E4, C4, A3

  osc.type = mode === 'ultra' ? 'triangle' : 'sine';
  osc.frequency.setValueAtTime(baseFreq * 0.8, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 3.8);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(1400, now + 3.8);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(mode === 'ultra' ? 0.08 : 0.05, now + 2.0);
  gain.gain.linearRampToValueAtTime(0.001, now + 3.9);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 4.0);
}

// Exhale sound: gentle descending airy release
export function playExhaleSound(mode = 'normal') {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  const baseFreq = mode === 'ultra' ? 392.00 : mode === 'premium' ? 329.63 : 261.63;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(baseFreq * 1.3, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 3.8);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 3.8);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(mode === 'ultra' ? 0.06 : 0.04, now + 1.2);
  gain.gain.linearRampToValueAtTime(0.001, now + 3.9);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 4.0);
}

// Success / VIP chime
export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime + i * 0.1;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  });
}

// Click tactile sound
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}
