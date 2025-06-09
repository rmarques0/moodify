import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MoodAnalysis {
  emotion: string;
  searchTerms: string[];
  confidence: number;
  language: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
}

export interface MoodAnalysisResponse {
  analysis: MoodAnalysis;
  playlists: Playlist[];
}

export const apiService = {
  async getMoodBasedPlaylists(message: string): Promise<{
    moodAnalysis: MoodAnalysis;
    playlists: Playlist[];
    originalText: string;
  }> {
    try {
      const response = await api.post('/mood/analyze', { message });
      
      return {
        moodAnalysis: response.data.analysis,
        playlists: response.data.playlists || [],
        originalText: message,
      };
    } catch (error) {
      console.error('Error getting mood-based playlists:', error);
      throw new Error('Failed to analyze mood and get playlists');
    }
  },
}; 