import { NextRequest, NextResponse } from 'next/server';
import { searchTracks } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');
    const title = searchParams.get('title');

    // Input validation and sanitization
    if (!artist && !title) {
      return NextResponse.json(
        { error: 'Either artist or title parameter is required' },
        { status: 400 }
      );
    }

    // Sanitize inputs - remove any potentially dangerous characters
    const sanitizedArtist = artist ? artist.trim().replace(/[<>\"'&]/g, '') : undefined;
    const sanitizedTitle = title ? title.trim().replace(/[<>\"'&]/g, '') : undefined;

    // Length limits to prevent abuse
    if (sanitizedArtist && sanitizedArtist.length > 100) {
      return NextResponse.json(
        { error: 'Artist name too long' },
        { status: 400 }
      );
    }

    if (sanitizedTitle && sanitizedTitle.length > 100) {
      return NextResponse.json(
        { error: 'Title too long' },
        { status: 400 }
      );
    }

    const tracks = await searchTracks(sanitizedArtist, sanitizedTitle);
    
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search tracks' },
      { status: 500 }
    );
  }
}
