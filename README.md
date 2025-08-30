# Napstify v2.0 BETA 6

A Windows 98/Napster-style web interface for searching and playing Spotify tracks. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Pixel-perfect Windows 98 UI**: Recreates the classic Napster v2.0 interface with authentic styling
- **Spotify Integration**: Search tracks using Spotify's API with client credentials
- **30-second Previews**: Play track previews directly in the browser
- **Authentic Experience**: Fake data columns (filesize, bitrate, user, connection, ping) for nostalgia
- **Connection Lights**: Color-coded status indicators (green/yellow/red) like the original Napster

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Spotify Web API**

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Spotify credentials:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
   ```

3. **Get Spotify API credentials:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Copy the Client ID and Client Secret to your `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Usage

1. Enter an artist name in the "Artist" field
2. Click "Find it!" or press Enter
3. Browse the results in the table
4. Click any row to play the 30-second preview
5. Use "Clear Fields" to reset the search

## Project Structure

```
/app
  /api/search/route.ts    # Spotify search API endpoint
  /globals.css           # Global styles with Win98 theme
  /layout.tsx            # Root layout
  /page.tsx              # Main application page
/components
  Win98Window.tsx        # Window container with title bar
  ResultsTable.tsx       # Results table with fake data
  StatusBar.tsx          # Status bar component
  AudioController.ts     # Audio playback management
/lib
  spotify.ts             # Spotify API helpers
```

## Future Enhancements

- **Premium Playback**: Integration with Spotify Web Playback SDK for full track playback
- **OAuth Authentication**: User login for personalized features
- **Playlist Management**: Save and manage playlists
- **Advanced Search**: Filter by title, album, year, etc.

## Notes

- This app uses Spotify's client credentials flow for demo purposes
- Only 30-second previews are available without user authentication
- All fake data (filesize, bitrate, user, etc.) is generated randomly for authenticity
- The UI is designed to evoke nostalgia while being fully functional

## License

MIT License - feel free to use and modify as needed.
