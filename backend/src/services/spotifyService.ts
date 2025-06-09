import axios from 'axios';

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
}

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || '';
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${this.clientId}:${this.clientSecret}`
            ).toString('base64')}`,
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
      
      return this.accessToken!;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw new Error('Failed to authenticate with Spotify');
    }
  }

  async searchPlaylists(searchTerms: string[]): Promise<SpotifyPlaylist[]> {
    try {
      const token = await this.getAccessToken();
      const results: SpotifyPlaylist[] = [];

      // Search using AI-suggested terms
      for (const term of searchTerms) {
        try {
          const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: term, type: 'playlist', limit: 12 },
          });

          if (response.data.playlists?.items) {
            // Filter out null/invalid playlists before adding
            const validPlaylists = response.data.playlists.items.filter(
              (playlist: any) => playlist && playlist.id && playlist.name
            );
            results.push(...validPlaylists);
          }
        } catch (searchError) {
          console.log(`Search failed for term: ${term}`);
        }
      }

      // Filter out any null/undefined results first
      const validResults = results.filter(playlist => 
        playlist && playlist.id && playlist.name
      );

      // Remove duplicates from valid results with extra safety
      let uniquePlaylists;
      try {
        uniquePlaylists = validResults.filter(
          (playlist, index, self) =>
            index === self.findIndex((p) => p && p.id === playlist.id)
        );
      } catch (dedupError) {
        console.warn('Deduplication failed, returning filtered results:', dedupError);
        uniquePlaylists = validResults;
      }

      return uniquePlaylists.slice(0, 8);
    } catch (error) {
      console.error('Spotify API failed, using mock playlists:', error);
      // Force redeploy - null safety fix applied
      return this.getMockPlaylists(searchTerms);
    }
  }

  private getMockPlaylists(searchTerms: string[]): SpotifyPlaylist[] {
    const colors = ['667eea', '764ba2', 'f093fb', 'f5576c', '4facfe', '00f2fe'];
    const emojis = ['🎵', '🎶', '🎼', '🎤', '🎧', '🎹'];

    // Detect if terms are in English or Spanish/Portuguese
    const isEnglish = searchTerms.some(term => 
      /\b(music|playlist|songs|beats|vibes|hits|workout|exercise|gym|happy|sad|study|focus|chill|relax)\b/i.test(term)
    );
    const isSpanish = searchTerms.some(term => 
      /\b(música|canciones|playlist|ritmos|alegre|triste|relajante|estudiar|gimnasio|feliz|calma)\b/i.test(term)
    );

    return searchTerms.slice(0, 4).map((term, index) => {
      const color = colors[index % colors.length];
      const emoji = emojis[index % emojis.length];
      
      // Create a working Spotify search URL instead of broken playlist links
      const searchQuery = encodeURIComponent(term);
      const spotifySearchUrl = `https://open.spotify.com/search/${searchQuery}/playlists`;
      
      return {
        id: `mock_${term.replace(/\s+/g, '_')}_${index}`,
        name: isEnglish && !isSpanish ? `${term} Playlist` : `Playlist de ${term}`,
        description: isEnglish && !isSpanish
          ? `The best ${term} music • Search for playlists on Spotify`
          : `La mejor música de ${term} • Buscar playlists en Spotify`,
        external_urls: { spotify: spotifySearchUrl },
        images: [{ url: `https://via.placeholder.com/300x300/${color}/ffffff?text=${emoji}` }],
      };
    });
  }
}

export const spotifyService = new SpotifyService(); 