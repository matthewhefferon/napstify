import React from 'react';
import { Track } from '@/lib/spotify';

interface ResultsTableProps {
  tracks: Track[];
  nowPlayingId: string | null;
  onPlay: (id: string, url: string, trackUri?: string) => void;
  onPause?: () => void;
  emptyMessage?: string;
}

// Generate consistent fake data for the Napster-style columns based on track ID
function generateFakeData(trackId: string) {
  const bitrates = [112, 128, 160, 192];
  const connections = ['Cable', 'DSL', '56K', 'Unknown', '14.4', '33.6'];
  const users = ['aek2cool', 'karouja', 'sam258', 'meekert', 'ubung', 'jdbir', 'RedOX', '10sami', 'medicm', 'meltonjeff', 'BigNana1', 'shortinger', 'upcydwn', 'Ighoth', 'caseygrl', 'golfvw1', 'Dieuwer', 'jmeash', 'mrflatus', 'voodoo', 'finewine0', 'imboy2'];
  const pings = [30, 41, 80, 100, 131, 171, 231, 271, 331];
  
  // Use track ID to generate consistent data
  const hash = trackId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const connectionIndex = Math.abs(hash) % connections.length;
  const connection = connections[connectionIndex];
  
  // Determine status based on connection type
  let status: 'green' | 'yellow' | 'red';
  if (connection === 'Cable' || connection === 'DSL') {
    status = 'green';
  } else if (connection === '56K') {
    status = 'yellow';
  } else {
    status = 'red';
  }
  
  return {
    filesize: Math.floor(Math.abs(hash) % 5000000) + 1000000,
    bitrate: bitrates[Math.abs(hash) % bitrates.length],
    freq: 44100,
    user: users[Math.abs(hash) % users.length],
    connection: connection,
    ping: pings[Math.abs(hash) % pings.length],
    status: status
  };
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatFilesize(bytes: number): string {
  return bytes.toLocaleString();
}

export default function ResultsTable({ tracks, nowPlayingId, onPlay, onPause, emptyMessage }: ResultsTableProps) {
  return (
    <div 
      className={`results-box ${tracks.length > 0 ? 'results-box-scrollable' : ''}`} 
      style={{ 
        height: '402px', 
        background: '#fff', 
        border: '1px solid var(--dark)', 
        position: 'relative',
        overflowY: 'scroll',
        scrollbarWidth: '16px',
        scrollbarColor: '#d4d0c8 #d4d0c8'
      }}
    >
      <table className="table-98">
        <colgroup>
          <col style={{ width: '45%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Filesize</th>
            <th>Bitrate</th>
            <th>Freq</th>
            <th>Length</th>
            <th>User</th>
            <th>Connection</th>
            <th>Ping</th>
          </tr>
        </thead>
        <tbody>
          {tracks.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 text-xs py-8">
                {emptyMessage || 'Try searching for an artist.'}
              </td>
            </tr>
          ) : (
            tracks.map((track) => {
              const fakeData = generateFakeData(track.id);
              const isPlaying = nowPlayingId === track.id;
              const isPlayable = track.preview_url !== null;
              
              return (
                <tr
                  key={track.id}
                  className={`row-98 cursor-pointer ${
                    isPlaying ? 'playing' : ''
                  }`}
                  onClick={() => {
                    console.log('Track clicked:', track.name, 'Preview URL:', track.preview_url);
                    const trackUri = `spotify:track:${track.id}`;
                    onPlay(track.id, track.preview_url || '', trackUri);
                  }}
                  title={track.preview_url ? 'Click to play preview' : 'Click to play full track (requires Spotify login)'}
                  style={{ cursor: 'pointer' }}
                >
                                  <td>
                  <div className="flex items-center min-w-0">
                    <div 
                      className={`dot ${
                        fakeData.status === 'green' ? 'green' : 
                        fakeData.status === 'yellow' ? 'yellow' : 'red'
                      }`}
                    />
                    <span className={`truncate ${isPlaying ? 'font-bold' : ''}`}>
                      {isPlaying ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPause?.();
                          }}
                          className="inline-flex items-center justify-center w-4 h-4 mr-1 bg-gray-300 border border-gray-600 text-xs hover:bg-gray-400"
                          title="Pause"
                        >
                          ⏸
                        </button>
                      ) : null}
                      Music\\{track.artists[0]?.name || 'Unknown'} - {track.name}.mp3
                    </span>
                  </div>
                </td>
                  <td>{formatFilesize(fakeData.filesize)}</td>
                  <td>{fakeData.bitrate}</td>
                  <td>{fakeData.freq}</td>
                  <td>{formatDuration(track.duration_ms)}</td>
                  <td>{fakeData.user}</td>
                  <td>{fakeData.connection}</td>
                  <td>{fakeData.ping}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
