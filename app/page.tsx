'use client';

import { useState } from 'react';
import Win98Window from '@/components/Win98Window';
import ResultsTable from '@/components/ResultsTable';
import StatusBar from '@/components/StatusBar';
import Toolbar98 from '@/components/Toolbar98';
import { audioController } from '@/components/AudioController';
import { Track } from '@/lib/spotify';

export default function Home() {
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [nowPlayingId, setNowPlayingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!artist.trim()) return;

    setIsLoading(true);
    setError(null);
    setTracks([]);
    setNowPlayingId(null);
    audioController.stop();

    try {
      const response = await fetch(`/api/search?artist=${encodeURIComponent(artist.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setTracks(data.tracks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setArtist('');
    setTracks([]);
    setNowPlayingId(null);
    setError(null);
    audioController.stop();
  };

  const handlePlay = async (id: string, url: string) => {
    try {
      setNowPlayingId(id);
      await audioController.play(url);
    } catch (err) {
      console.error('Playback error:', err);
      setNowPlayingId(null);
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
        <span className="cursor-default">File</span>
        <span className="cursor-default">Actions</span>
        <span className="cursor-default">Help</span>
      </div>

      {/* Pixel-accurate toolbar with icons */}
      <Toolbar98 />

            {/* Main Content */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Search Panel */}
        <div className="w-80 space-y-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20">Artist:</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-98 flex-1"
              placeholder="Enter artist name"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20">Title:</label>
            <input
              type="text"
              className="input-98 flex-1"
              placeholder="(Optional)"
              disabled
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="label-98 w-20">Max Results:</label>
            <input
              type="text"
              value="100"
              className="input-98 flex-1"
              disabled
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleSearch}
              disabled={isLoading || !artist.trim()}
              className="btn-98"
            >
              {isLoading ? 'Searching...' : 'Find it!'}
            </button>
            <button
              onClick={handleClear}
              className="btn-98"
            >
              Clear Fields
            </button>
            <button className="btn-98">
              Advanced >>
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex-1 flex flex-col">
          <div className="results-box">
            <ResultsTable
              tracks={tracks}
              nowPlayingId={nowPlayingId}
              onPlay={handlePlay}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-auto flex-shrink-0">
        <div className="statusbar-98">
          <span>Returned {tracks.length} results.</span>
          <div className="status-groove" />
          <button className="bottom-btn">Get Selected Songs</button>
          <button className="bottom-btn">Add Selected User to Hot List</button>
        </div>
      </div>
    </Win98Window>
  );
}
