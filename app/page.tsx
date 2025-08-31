'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Win98Window from '@/components/Win98Window';
import Win98Modal from '@/components/Win98Modal';
import ResultsTable from '@/components/ResultsTable';

import Toolbar98 from '@/components/Toolbar98';
import { audioController } from '@/components/AudioController';
import { spotifyPlayer } from '@/components/SpotifyPlayer';
import { Track } from '@/lib/spotify';

export default function Home() {
  const { data: session, status } = useSession();
  
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [nowPlayingId, setNowPlayingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fieldsCleared, setFieldsCleared] = useState(false);

  const [playerReady, setPlayerReady] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(false);
  
  // Add timeout for session loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'loading') {
        setSessionTimeout(true);
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timer);
  }, [status]);
  
  // Initialize Spotify player when session is available
  useEffect(() => {
    if (session?.accessToken) {
      spotifyPlayer.initialize(session.accessToken, () => {
        setPlayerReady(true);
      }).catch(console.error);
    }
    
    return () => {
      spotifyPlayer.disconnect();
      setPlayerReady(false);
    };
  }, [session?.accessToken]);
  
  // If still loading session, show loading with timeout
  if (status === 'loading' && !sessionTimeout) {
    return (
      <Win98Window>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-sm">Loading session...</div>
            <div className="text-xs mt-2 text-gray-600">If this takes too long, try refreshing</div>
          </div>
        </div>
      </Win98Window>
    );
  }
  
  // If session loading timed out, show the app anyway
  if (status === 'loading' && sessionTimeout) {
    console.warn('Session loading timed out, continuing without session');
  }

  const handleSearch = async () => {
    if (!artist.trim() && !title.trim()) return;

    setIsLoading(true);
    setTracks([]);
    setNowPlayingId(null);
    setFieldsCleared(false);
    audioController.stop();

    try {
      const params = new URLSearchParams();
      if (artist.trim()) params.append('artist', artist.trim());
      if (title.trim()) params.append('title', title.trim());
      
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setTracks(data.tracks);
    } catch (err) {
      // Handle search error silently for now
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setArtist('');
    setTitle('');
    setTracks([]);
    setNowPlayingId(null);
    setFieldsCleared(true);
    audioController.stop();
    if (session?.accessToken) {
      spotifyPlayer.pause().catch(console.error);
    }
  };

  const handlePlay = async (id: string, url: string, trackUri?: string) => {
    
    // If no preview URL, we need Spotify login for full playback
    if (!url) {
      if (!session) {
        setShowLoginModal(true);
        return;
      }
      
      // Try to play full track via Spotify Web Playback SDK
      if (trackUri) {
        try {
          // Check if player is ready first
          if (!spotifyPlayer.isReady()) {
            const status = spotifyPlayer.getStatus();
            alert(`Spotify player not ready: ${status}. Please open Spotify on another device (desktop app, mobile app, or web player) and play any song, then try again.`);
            return;
          }
          
          setNowPlayingId(id);
          await spotifyPlayer.playTrack(trackUri);
        } catch (err) {
          console.error('Spotify playback error:', err);
          setNowPlayingId(null);
          alert(err instanceof Error ? err.message : 'Failed to play track');
        }
      } else {
        alert('No preview available and track URI not found.');
      }
      return;
    }
    
    // For tracks with preview URLs, try to play them
    try {
      setNowPlayingId(id);
      await audioController.play(url, () => {
        // Auto-play next track when current one ends
        const currentIndex = tracks.findIndex(track => track.id === id);
        if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
          const nextTrack = tracks[currentIndex + 1];
          if (nextTrack.preview_url) {
            handlePlay(nextTrack.id, nextTrack.preview_url);
          }
        }
      });
    } catch (err) {
      console.error('Playback error:', err);
      setNowPlayingId(null);
    }
  };

  const handlePause = async () => {
    try {
      if (session?.accessToken) {
        await spotifyPlayer.pause();
      } else {
        await audioController.stop();
      }
      setNowPlayingId(null);
    } catch (err) {
      console.error('Pause error:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Win98Window>
      {/* Menu Bar */}
      <div className="win98-menubar">
        <div className="cursor-default">File</div>
        <div className="cursor-default">Actions</div>
        <div className="cursor-default">Help</div>
        <div className="ml-auto flex items-center space-x-2">
          {session ? (
            <>
              <span className="text-xs">Signed in as: {session.user?.name}</span>
              <span className="text-xs text-gray-600">({playerReady ? 'Ready' : spotifyPlayer.getStatus()})</span>
              {!spotifyPlayer.isReady() && (
                <button
                  onClick={() => spotifyPlayer.reconnect()}
                  className="text-xs"
                  title="Reconnect Spotify player"
                >
                  🔄
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="text-xs"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('spotify')}
              className="text-xs"
            >
              Sign in
            </button>
          )}
        </div>
      </div>

      {/* Pixel-accurate toolbar with icons */}
      <Toolbar98 />

      {/* Main Content */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Search Panel */}
        <div className="w-full max-w-96 space-y-1 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20 text-right">Artist:</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              onKeyPress={handleKeyPress}
              className="win98-input flex-1"
              placeholder=""
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20 text-right">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="win98-input flex-1"
              placeholder=""
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20 text-right">Max Results:</label>
            <input
              type="text"
              defaultValue="50"
              className="win98-input flex-1"
              readOnly
            />
          </div>

          <div className="flex gap-1 ml-20 flex-1" style={{ marginLeft: 'calc(5rem + 0.5rem)' }}>
            <button
              onClick={handleSearch}
              disabled={isLoading || !artist.trim()}
              className="win98-btn flex-1"
            >
              {isLoading ? 'Searching...' : 'Find it!'}
            </button>
            <button
              onClick={handleClear}
              className="win98-btn flex-1"
            >
              Clear Fields
            </button>
            <button className="win98-btn flex-1">
              Advanced &gt;&gt;
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <ResultsTable
              tracks={tracks}
              nowPlayingId={nowPlayingId}
              onPlay={handlePlay}
              onPause={handlePause}
              emptyMessage={fieldsCleared ? 'Try searching for an artist.' : undefined}
            />
          </div>
          
          {/* Status Bar */}
          <div className="statusbar-98 flex-shrink-0">
            <div className="status-text">Returned {tracks.length} results.</div>
            <div className="status-buttons">
              <button className="win98-btn flex-1">Get Selected Songs</button>
              <button className="win98-btn flex-1">Add Selected User to Hot List</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Win98-style Login Modal */}
      <Win98Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onConfirm={() => {
          setShowLoginModal(false);
          signIn('spotify', { callbackUrl: window.location.href });
        }}
        title="Napstify"
        message="Sign in with Spotify to play full tracks and control playback on your devices?"
        confirmText="Sign In"
        cancelText="Cancel"
      />
    </Win98Window>
  );
}
