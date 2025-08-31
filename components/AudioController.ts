class AudioController {
  private audio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;
  private onEndedCallback: (() => void) | null = null;

  play(url: string, onEnded?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any currently playing audio
      this.stop();

      // Create new audio element
      this.audio = new Audio(url);
      this.currentUrl = url;
      this.onEndedCallback = onEnded || null;

      this.audio.addEventListener('canplaythrough', () => {
        this.audio?.play().then(resolve).catch(reject);
      });

      this.audio.addEventListener('ended', () => {
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      });

      this.audio.addEventListener('error', (e) => {
        reject(new Error('Failed to load audio'));
      });

      // Load the audio
      this.audio.load();
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.currentUrl = null;
    }
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused;
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }
}

// Export singleton instance
export const audioController = new AudioController();
