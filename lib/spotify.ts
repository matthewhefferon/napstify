export type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  preview_url: string | null;
  duration_ms: number;
};

type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
};

type SpotifySearchResponse = {
  tracks: {
    items: Array<{
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      preview_url: string | null;
      duration_ms: number;
    }>;
  };
};

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getClientCredentialsToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify token');
  }

  const data: SpotifyTokenResponse = await response.json();
  
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 minute early
  };

  return data.access_token;
}

export async function searchTracks(artist: string): Promise<Track[]> {
  const token = await getClientCredentialsToken();
  
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artist)}&type=track&limit=100`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search Spotify');
  }

  const data: SpotifySearchResponse = await response.json();
  
  return data.tracks.items.map(item => ({
    id: item.id,
    name: item.name,
    artists: item.artists,
    preview_url: item.preview_url,
    duration_ms: item.duration_ms,
  }));
}
