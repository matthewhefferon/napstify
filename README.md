# Napstify v2.0 BETA 6

A Windows 98-style Spotify search interface that recreates the classic Napster v2.0 aesthetic with modern functionality.

![Napstify Screenshot](https://via.placeholder.com/800x600/cccccc/000000?text=Napstify+v2.0+BETA+6)

## Features

- **Authentic Win98 UI**: Pixel-perfect recreation of Windows 98/Napster v2.0 interface
- **Spotify Integration**: Search and play tracks using Spotify's API
- **Preview Playback**: 30-second preview URLs for instant listening
- **Full Track Playback**: Spotify Web Playback SDK integration for full tracks
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-play**: Seamless track-to-track playback

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Win98 utilities
- **Authentication**: NextAuth.js with Spotify OAuth
- **Audio**: HTML5 Audio API + Spotify Web Playback SDK
- **Deployment**: Vercel-ready

## Quick Start

### Prerequisites

- Node.js 18+ 
- Spotify Developer Account
- ngrok (for local HTTPS development)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/napstify.git
   cd napstify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Spotify credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Configure Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/api/auth/callback/spotify` to Redirect URIs
   - Copy Client ID and Client Secret to `.env.local`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **For HTTPS (required for Spotify OAuth)**
   ```bash
   npx ngrok http 3000
   ```
   Update `NEXTAUTH_URL` and Spotify redirect URI with the ngrok URL.

## Usage

1. **Search for Music**: Enter an artist name and optionally a title
2. **Preview Tracks**: Click any track with a preview URL for instant 30-second playback
3. **Full Playback**: Click tracks without previews to sign in with Spotify for full track playback
4. **Auto-play**: When a preview ends, the next track automatically starts

## Project Structure

```
napstify/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── AudioController.ts # Audio playback logic
│   ├── Icons98.tsx        # Win98-style icons
│   ├── ResultsTable.tsx   # Search results table
│   ├── SpotifyPlayer.ts   # Spotify Web Playback SDK
│   ├── Toolbar98.tsx      # Win98 toolbar
│   ├── Win98Modal.tsx     # Win98-style modals
│   └── Win98Window.tsx    # Main window component
├── lib/                   # Utility libraries
│   └── spotify.ts         # Spotify API integration
├── types/                 # TypeScript type definitions
└── tailwind.config.ts     # Tailwind configuration
```

## Customization

### Win98 Theme Colors

The Win98 color palette is defined in `tailwind.config.ts`:

```js
colors: {
  'win98': {
    face: '#d4d0c8',      // Main background
    light: '#ffffff',     // Highlight color
    shadow: '#808080',    // Shadow color
    dark: '#000000',      // Border color
    titlebar: '#000080',  // Title bar blue
  }
}
```

### Custom Components

All Win98-styled components use Tailwind utilities:

- `.win98-btn` - 3D beveled buttons
- `.win98-input` - Sunken input fields
- `.win98-titlebar` - Blue gradient title bar
- `.win98-table-header` - Table headers

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing Tailwind CSS patterns
- Maintain Win98 aesthetic consistency
- Add proper error handling
- Include TypeScript types for new components

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Napster v2.0 interface
- Built with modern web technologies
- Spotify API for music data and playback
- NextAuth.js for authentication

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/napstify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/napstify/discussions)
- **Email**: your-email@example.com

---

Made with ❤️ for the Win98 aesthetic
