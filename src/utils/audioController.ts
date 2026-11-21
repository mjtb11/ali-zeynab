/**
 * Singleton HTML Audio API controller.
 *
 * - Authorizes audio inside the user's initial envelope click gesture to satisfy
 *   mobile browser autoplay policies (iOS Safari / Chrome Mobile).
 * - Starts actual audible playback ONLY after the invitation paper has fully emerged.
 * - Prevents duplicate audio instances across screen transitions.
 * - Fails gracefully if audio playback is blocked or the file is unavailable.
 */

export interface AudioSnapshot {
  isPlaying: boolean;
  isReady: boolean;
  hasError: boolean;
  currentTime: number;
  duration: number;
  progress: number;
}

type Listener = (snapshot: AudioSnapshot) => void;

class WeddingAudioController {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private fadeFrameId: number | null = null;
  private authorized = false;
  private userPausedManually = false;
  private src = '';
  private snapshot: AudioSnapshot = {
    isPlaying: false,
    isReady: false,
    hasError: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
  };

  init(src: string): void {
    if (typeof window === 'undefined') return;
    if (this.audio && this.src === src) return;

    this.cleanup();
    this.src = src;

    const audio = new Audio();
    audio.src = src;
    audio.preload = 'metadata';
    audio.loop = true;
    audio.crossOrigin = 'anonymous';
    audio.setAttribute('playsinline', 'true');

    audio.addEventListener('loadedmetadata', () => {
      this.updateSnapshot({
        isReady: true,
        hasError: false,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      });
    });

    audio.addEventListener('canplay', () => {
      this.updateSnapshot({ isReady: true, hasError: false });
    });

    audio.addEventListener('timeupdate', () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      const currentTime = audio.currentTime || 0;
      const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
      this.updateSnapshot({ currentTime, duration, progress });
    });

    audio.addEventListener('play', () => {
      this.updateSnapshot({ isPlaying: true, hasError: false });
    });

    audio.addEventListener('pause', () => {
      this.updateSnapshot({ isPlaying: false });
    });

    audio.addEventListener('error', () => {
      this.updateSnapshot({ isPlaying: false, hasError: true });
    });

    this.audio = audio;
  }

  /**
   * Call synchronously inside the user's envelope click handler to unlock
   * HTMLAudioElement playback without playing audible sound yet.
   */
  authorizeOnGesture(): void {
    if (!this.audio || this.authorized) return;

    try {
      const audio = this.audio;
      audio.muted = true;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
            this.authorized = true;
          })
          .catch(() => {
            audio.muted = false;
            // Fallback: browser refused silent unlock; we'll still attempt play on reveal
          });
      }
    } catch {
      // Never block UI flow if audio fails
    }
  }

  /**
   * Begins audible playback with a smooth fade-in strictly after the invitation
   * card has completely emerged from the envelope.
   */
  async startAfterReveal(): Promise<void> {
    if (!this.audio || this.userPausedManually) return;
    if (!this.audio.paused && !this.audio.muted) return;

    const audio = this.audio;
    try {
      this.cancelFade();
      audio.muted = false;
      audio.volume = 0.02;
      await audio.play();
      this.fadeVolume(0.02, 0.85, 1300);
    } catch {
      // Autoplay may still be restricted on strict devices; user can tap play manually
      this.updateSnapshot({ isPlaying: false });
    }
  }

  async toggle(): Promise<void> {
    if (!this.audio) return;
    const audio = this.audio;

    if (audio.paused) {
      this.userPausedManually = false;
      try {
        this.cancelFade();
        audio.muted = false;
        audio.volume = Math.max(audio.volume, 0.85);
        await audio.play();
      } catch {
        this.updateSnapshot({ isPlaying: false, hasError: true });
      }
    } else {
      this.userPausedManually = true;
      this.cancelFade();
      audio.pause();
    }
  }

  seekToRatio(ratio: number): void {
    if (!this.audio || !Number.isFinite(this.audio.duration) || this.audio.duration <= 0) return;
    const clamped = Math.min(1, Math.max(0, ratio));
    this.audio.currentTime = clamped * this.audio.duration;
  }

  getSnapshot(): AudioSnapshot {
    return this.snapshot;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.snapshot);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private fadeVolume(from: number, to: number, durationMs: number): void {
    if (!this.audio) return;
    const audio = this.audio;
    const startTime = performance.now();

    const step = (now: number) => {
      if (!this.audio || audio.paused) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      audio.volume = Math.min(1, Math.max(0, from + (to - from) * eased));
      if (t < 1) {
        this.fadeFrameId = requestAnimationFrame(step);
      } else {
        this.fadeFrameId = null;
      }
    };

    this.fadeFrameId = requestAnimationFrame(step);
  }

  private cancelFade(): void {
    if (this.fadeFrameId !== null) {
      cancelAnimationFrame(this.fadeFrameId);
      this.fadeFrameId = null;
    }
  }

  private updateSnapshot(patch: Partial<AudioSnapshot>): void {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((fn) => fn(this.snapshot));
  }

  private cleanup(): void {
    this.cancelFade();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}

export const weddingAudio = new WeddingAudioController();
