import React from 'react';
import { Track } from '@/lib/spotify';

interface ResultsTableProps {
  tracks: Track[];
  nowPlayingId: string | null;
  onPlay: (id: string, url: string) => void;
}

// Generate fake data for the Napster-style columns
function generateFakeData() {
  const bitrates = [112, 128, 160, 192];
  const connections = ['Cable', 'DSL', '56K', 'Unknown'];
  const users = ['aek2cool', 'meltonjeff', 'metalfan', 'rockstar', 'musiclover', 'headbanger'];
  const pings = [30, 41, 80, 100, 131, 171, 231, 271, 331];
  
  return {
    filesize: Math.floor(Math.random() * 5000000) + 1000000,
    bitrate: bitrates[Math.floor(Math.random() * bitrates.length)],
    freq: 44100,
    user: users[Math.floor(Math.random() * users.length)],
    connection: connections[Math.floor(Math.random() * connections.length)],
    ping: pings[Math.floor(Math.random() * pings.length)],
    status: Math.random() > 0.2 ? 'green' : Math.random() > 0.5 ? 'yellow' : 'red'
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

export default function ResultsTable({ tracks, nowPlayingId, onPlay }: ResultsTableProps) {
  return (
    <div className="results-box">
      <table className="table-98">
        <colgroup>
          <col style={{ width: '436px' }} />
          <col style={{ width: '86px' }} />
          <col style={{ width: '58px' }} />
          <col style={{ width: '58px' }} />
          <col style={{ width: '58px' }} />
          <col style={{ width: '132px' }} />
          <col style={{ width: '92px' }} />
          <col style={{ width: '54px' }} />
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
                No results found. Try searching for an artist.
              </td>
            </tr>
          ) : (
            tracks.map((track) => {
              const fakeData = generateFakeData();
              const isPlaying = nowPlayingId === track.id;
              const isPlayable = track.preview_url !== null;
              
              return (
                <tr
                  key={track.id}
                  className={`row-98 cursor-pointer ${
                    isPlaying ? 'playing' : ''
                  } ${!isPlayable ? 'text-gray-400' : ''}`}
                  onClick={() => {
                    if (isPlayable && track.preview_url) {
                      onPlay(track.id, track.preview_url);
                    }
                  }}
                  title={!isPlayable ? 'No preview available' : 'Click to play preview'}
                >
                  <td>
                    <div className="flex items-center">
                      <div 
                        className={`dot ${
                          fakeData.status === 'green' ? 'green' : 
                          fakeData.status === 'yellow' ? 'yellow' : 'red'
                        }`}
                      />
                      <span className={isPlaying ? 'font-bold' : ''}>
                        {isPlaying && '• '}Music\\{track.artists[0]?.name || 'Unknown'} - {track.name}.mp3
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
