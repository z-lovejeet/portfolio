'use client';

class UIAudioEngine {
    private context: AudioContext | null = null;
    private initialized = false;

    constructor() {
        // We must unlock the AudioContext on the very first user interaction
        // because modern browsers block Web Audio API from playing on "hover"
        // until a physical "click", "touchstart", or "keydown" happens.
        if (typeof window !== 'undefined') {
            const unlockAudio = () => {
                this.init();
                // Remove listeners after first successful unlock to save performance
                window.removeEventListener('click', unlockAudio);
                window.removeEventListener('touchstart', unlockAudio);
                window.removeEventListener('keydown', unlockAudio);
            };

            window.addEventListener('click', unlockAudio, { once: true });
            window.addEventListener('touchstart', unlockAudio, { once: true });
            window.addEventListener('keydown', unlockAudio, { once: true });
        }
    }

    private init() {
        if (typeof window === 'undefined') return;

        try {
            if (!this.context) {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                this.context = new AudioContextClass();
            }
            if (this.context.state === 'suspended') {
                this.context.resume();
            }
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported', e);
        }
    }

    playHover() {
        // If they hover before ever clicking the page, context won't be initialized yet to prevent errors
        if (!this.initialized) return;
        this.init();
        if (!this.context) return;

        const t = this.context.currentTime;
        const osc = this.context.createOscillator();
        const gainNode = this.context.createGain();

        // Very soft, deep sine wave
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.1);

        // Quick, subtle volume envelope
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.03, t + 0.02); // 3% volume, very subtle
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(gainNode);
        gainNode.connect(this.context.destination);

        osc.start(t);
        osc.stop(t + 0.2);
    }

    playClick() {
        this.init();
        if (!this.context || !this.initialized) return;

        const t = this.context.currentTime;
        const osc = this.context.createOscillator();
        const gainNode = this.context.createGain();

        // Slightly sharper triangle wave for click feeling
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(600, t + 0.05);

        // Snappy click volume envelope
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.08, t + 0.01); // 8% volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.connect(gainNode);
        gainNode.connect(this.context.destination);

        osc.start(t);
        osc.stop(t + 0.15);
    }
}

// Singleton instance
export const uiSound = typeof window !== 'undefined' ? new UIAudioEngine() : null;
