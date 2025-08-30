import { NextRequest, NextResponse } from 'next/server';
import { searchTracks } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist parameter is required' },
        { status: 400 }
      );
    }

    const tracks = await searchTracks(artist);
    
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search tracks' },
      { status: 500 }
    );
  }
}
