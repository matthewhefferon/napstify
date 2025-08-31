/**
 * Represents a track from Spotify API
 */
export type Track = {
  /** Spotify track ID */
  id: string;
  /** Track name */
  name: string;
  /** Array of artists for this track */
  artists: { name: string }[];
  /** 30-second preview URL (null if not available) */
  preview_url: string | null;
  /** Track duration in milliseconds */
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

/**
 * Gets a Spotify access token using client credentials flow
 * @returns Promise<string> The access token
 * @throws Error if credentials are missing or token request fails
 */
async function getClientCredentialsToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Spotify credentials:', { 
      hasClientId: !!clientId, 
      hasClientSecret: !!clientSecret 
    });
    throw new Error('Spotify credentials not configured');
  }

  console.log('Getting Spotify token...');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Spotify token error:', response.status, errorText);
    throw new Error(`Failed to get Spotify token: ${response.status} ${errorText}`);
  }

  const data: SpotifyTokenResponse = await response.json();
  
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 minute early
  };

  console.log('Got Spotify token successfully');
  return data.access_token;
}

/**
 * Searches for tracks on Spotify using artist and/or title
 * @param artist - Artist name to search for
 * @param title - Track title to search for
 * @returns Promise<Track[]> Array of matching tracks
 * @throws Error if the search request fails
 */
export async function searchTracks(artist?: string, title?: string): Promise<Track[]> {
  const token = await getClientCredentialsToken();
  
  // Build search query
  let query = '';
  if (artist && title) {
    query = `artist:${encodeURIComponent(artist)} track:${encodeURIComponent(title)}`;
    console.log('Searching Spotify for artist and title:', artist, title);
  } else if (artist) {
    query = `artist:${encodeURIComponent(artist)}`;
    console.log('Searching Spotify for artist:', artist);
  } else if (title) {
    query = `track:${encodeURIComponent(title)}`;
    console.log('Searching Spotify for title:', title);
  }
  
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Spotify search error:', response.status, errorText);
    throw new Error(`Failed to search Spotify: ${response.status} ${errorText}`);
  }

  const data: SpotifySearchResponse = await response.json();
  
  console.log(`Found ${data.tracks.items.length} tracks for query: ${query}`);
  
  const tracks = data.tracks.items.map(item => ({
    id: item.id,
    name: item.name,
    artists: item.artists,
    preview_url: item.preview_url,
    duration_ms: item.duration_ms,
  }));
  
  // Log preview URL availability
  const tracksWithPreviews = tracks.filter(t => t.preview_url);
  console.log(`${tracksWithPreviews.length} out of ${tracks.length} tracks have preview URLs`);
  
  return tracks;
}
