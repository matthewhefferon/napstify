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
  const minutes = Math.floor((ms || 180000) / 60000);
  const seconds = Math.round(((ms || 180000) % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatFilesize(bytes: number): string {
  const size = Math.max(2_100_000, bytes);
  return size.toLocaleString();
}

export default function ResultsTable({ tracks, nowPlayingId, onPlay, onPause, emptyMessage }: ResultsTableProps) {
  return (
    <div className="win98-scrollbar bg-white border border-black relative overflow-y-auto overflow-x-auto h-full max-h-[calc(100vh-300px)]">
      <table className="w-full border-collapse table-fixed max-w-full overflow-hidden">
        <colgroup>
          <col style={{ minWidth: '280px', width: '35%' }} />
          <col style={{ minWidth: '70px', width: '10%' }} />
          <col style={{ minWidth: '50px', width: '8%' }} />
          <col style={{ minWidth: '50px', width: '8%' }} />
          <col style={{ minWidth: '50px', width: '8%' }} />
          <col style={{ minWidth: '100px', width: '12%' }} />
          <col style={{ minWidth: '80px', width: '10%' }} />
          <col style={{ minWidth: '50px', width: '9%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="win98-table-header">Filename</th>
            <th className="win98-table-header-center">Filesize</th>
            <th className="win98-table-header-center">Bitrate</th>
            <th className="win98-table-header-center">Freq</th>
            <th className="win98-table-header-center">Length</th>
            <th className="win98-table-header-center">User</th>
            <th className="win98-table-header-center">Connection</th>
            <th className="win98-table-header-center">Ping</th>
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
                  className={`win98-table-row cursor-pointer ${
                    isPlaying ? 'playing' : ''
                  }`}
                  onClick={() => {
                    const trackUri = `spotify:track:${track.id}`;
                    onPlay(track.id, track.preview_url || '', trackUri);
                  }}
                  title={track.preview_url ? 'Click to play preview' : 'Click to play full track (requires Spotify login)'}
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
                  <td className="win98-table-cell-center">{formatFilesize(fakeData.filesize)}</td>
                  <td className="win98-table-cell-center">{fakeData.bitrate}</td>
                  <td className="win98-table-cell-center">{fakeData.freq}</td>
                  <td className="win98-table-cell-center">{formatDuration(track.duration_ms)}</td>
                  <td className="win98-table-cell-center">{fakeData.user}</td>
                  <td className="win98-table-cell-center">{fakeData.connection}</td>
                  <td className="win98-table-cell-center">{fakeData.ping}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
