class SpotifyPlayer {
  private player: Spotify.Player | null = null;
  private deviceId: string | null = null;
  private accessToken: string | null = null;
  private onReadyCallback: (() => void) | null = null;

  async initialize(accessToken: string, onReady?: () => void): Promise<void> {
    this.accessToken = accessToken;
    this.onReadyCallback = onReady || null;
    console.log('Initializing Spotify player with token:', accessToken ? 'Present' : 'Missing');
    
    // Load Spotify Web Playback SDK
    if (!window.Spotify) {
      console.log('Loading Spotify SDK...');
      await this.loadSpotifySDK();
    }

    // Initialize player
    this.player = new window.Spotify.Player({
      name: 'Napstify Web Player',
      getOAuthToken: (cb: (token: string) => void) => { 
        console.log('Getting OAuth token...');
        cb(accessToken); 
      }
    });

    // Error handling
    this.player.addListener('initialization_error', ({ message }) => {
      console.error('Failed to initialize Spotify player:', message);
    });

    this.player.addListener('authentication_error', ({ message }) => {
      console.error('Failed to authenticate Spotify player:', message);
    });

    this.player.addListener('account_error', ({ message }) => {
      console.error('Failed to validate Spotify account:', message);
    });

    this.player.addListener('playback_error', ({ message }) => {
      console.error('Failed to perform playback:', message);
    });

    // Playback status updates
    this.player.addListener('player_state_changed', state => {
      console.log('Player state changed:', state);
    });

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      this.deviceId = device_id;
      if (this.onReadyCallback) {
        this.onReadyCallback();
      }
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      this.deviceId = null;
    });

    // Player state changed
    this.player.addListener('player_state_changed', state => {
      console.log('Player state changed:', state);
    });

    // Initialization error
    this.player.addListener('initialization_error', ({ message }) => {
      console.error('Initialization error:', message);
    });

    // Authentication error
    this.player.addListener('authentication_error', ({ message }) => {
      console.error('Authentication error:', message);
    });

    // Account error
    this.player.addListener('account_error', ({ message }) => {
      console.error('Account error:', message);
    });

    // Playback error
    this.player.addListener('playback_error', ({ message }) => {
      console.error('Playback error:', message);
    });

    // Connect to the player
    console.log('Connecting to Spotify player...');
    const connected = await this.player.connect();
    console.log('Connection result:', connected);
  }

  private async loadSpotifySDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set up the callback before loading the script
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('Spotify SDK ready');
        resolve();
      };
      
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Spotify SDK script loaded');
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Spotify SDK:', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    });
  }

  async playTrack(trackUri: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }
    
    if (!this.deviceId) {
      throw new Error('Spotify player not ready. Please open Spotify on another device and play any song, then try again.');
    }

    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to play track: ${response.statusText}`);
    }
  }

  async pause(): Promise<void> {
    if (!this.accessToken) return;

    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  async resume(): Promise<void> {
    if (!this.accessToken) return;

    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  disconnect(): void {
    if (this.player) {
      this.player.disconnect();
      this.player = null;
    }
    this.deviceId = null;
    this.accessToken = null;
  }

  async reconnect(): Promise<void> {
    console.log('Reconnecting Spotify player...');
    if (this.accessToken) {
      this.disconnect();
      await this.initialize(this.accessToken);
    }
  }

  isReady(): boolean {
    return this.deviceId !== null && this.accessToken !== null;
  }

  getStatus(): string {
    if (!this.accessToken) {
      return 'No access token';
    }
    if (!this.deviceId) {
      return 'No device ID - Spotify not active on another device';
    }
    return 'Ready';
  }
}

// Create singleton instance
export const spotifyPlayer = new SpotifyPlayer();

// Add Spotify types to window
declare global {
  interface Window {
    Spotify: {
      Player: new (config: any) => Spotify.Player;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
  
  namespace Spotify {
    interface Player {
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(event: string, callback: (data: any) => void): void;
      removeListener(event: string): void;
    }
  }
}
