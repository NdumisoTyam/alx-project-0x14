import type { NextApiRequest, NextApiResponse } from 'next';

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
};

type Data = {
  movies?: Movie[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only accept POST from client
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method Not Allowed. Use POST to fetch movies.' });
  }

  // Destructure and default pagination/filter parameters
  const { page = 1, year, genre } = req.body as {
    page?: number;
    year?: number;
    genre?: string;
  };

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error('TMDB_API_KEY not set in environment');
    return res
      .status(500)
      .json({ error: 'Server misconfiguration: missing TMDB_API_KEY' });
  }

  // Build the TMDB discover/movie URL with query params
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('page', page.toString());
  if (year) {
    url.searchParams.append('primary_release_year', year.toString());
  }
  if (genre) {
    // Note: TMDB expects genre IDs, not names. Make sure `genre` here
    // is a valid TMDB genre ID string if you want filtering by genre.
    url.searchParams.append('with_genres', genre);
  }

  console.log('Fetching movies from TMDB:', url.toString());

  try {
    const resp = await fetch(url.toString());
    console.log('TMDB response status:', resp.status, resp.statusText);

    const body = await resp.json();

    if (!resp.ok) {
      console.error('TMDB error body:', body);
      return res
        .status(resp.status)
        .json({ error: body.status_message || 'Failed to fetch movies' });
    }

    // Success: return results array
    return res.status(200).json({ movies: body.results });
  } catch (err: any) {
    console.error('Unhandled handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}