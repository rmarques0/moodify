import express from 'express';
import { analyzeMood } from '../services/nlpService';
import { spotifyService } from '../services/spotifyService';

const router = express.Router();

// Analyze mood and get playlist recommendations
router.post('/analyze', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    // Analyze mood using AI
    const moodAnalysis = await analyzeMood(message);
    
    console.log('Mood analysis result:', moodAnalysis);

    // Get playlists using the AI-suggested search terms
    const playlists = await spotifyService.searchPlaylists(moodAnalysis.searchTerms);

    res.json({
      analysis: {
        emotion: moodAnalysis.emotion,
        searchTerms: moodAnalysis.searchTerms,
        confidence: moodAnalysis.confidence,
        language: moodAnalysis.language
      },
      playlists: playlists || []
    });

  } catch (error) {
    console.error('Error in mood analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze mood and get recommendations' 
    });
  }
});

export default router; 