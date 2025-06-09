import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface MoodAnalysis {
  emotion: string;
  searchTerms: string[];
  confidence: number;
  language: string;
}

export const analyzeMood = async (text: string): Promise<MoodAnalysis> => {
  try {
    const prompt = `You must analyze mood and suggest search terms in the EXACT SAME LANGUAGE as the user's input.

User message: "${text}"

MANDATORY LANGUAGE MATCHING:
- Input in English → Response MUST be in English
- Input in Spanish → Response MUST be in Spanish  
- Input in Portuguese → Response MUST be in Portuguese

EXAMPLES:
- "I need to study" → {"emotion": "focused", "searchTerms": ["study music", "lo-fi beats", "focus playlist", "concentration music"], "language": "en"}
- "Estoy triste" → {"emotion": "triste", "searchTerms": ["música triste", "canciones melancólicas", "baladas", "playlist tristeza"], "language": "es"}
- "Quero relaxar" → {"emotion": "relaxado", "searchTerms": ["música relaxante", "chill brasileiro", "bossa nova", "sons calmos"], "language": "pt"}

Detect the language of "${text}" and respond with emotion and search terms in that EXACT language.

JSON format:
{
  "emotion": "emotion in same language as input",
  "searchTerms": ["term1", "term2", "term3", "term4"],
  "confidence": 0.9,
  "language": "language_code"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are a music curator. CRITICAL: You must detect the user's input language and respond with ALL content (emotion + search terms) in that EXACT language. English input = English response. Spanish input = Spanish response. Portuguese input = Portuguese response. Never mix languages."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const analysis = JSON.parse(response) as MoodAnalysis;
    
    // Validate the response
    if (!analysis.emotion || !analysis.searchTerms || !Array.isArray(analysis.searchTerms)) {
      throw new Error('Invalid response format from OpenAI');
    }

    return analysis;

  } catch (error) {
    console.error('Error in mood analysis:', error);
    
    // Simple fallback
    return {
      emotion: 'neutral',
      searchTerms: ['music', 'playlist', 'songs', 'chill'],
      confidence: 0.3,
      language: 'en',
    };
  }
}; 