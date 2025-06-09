import React, { useState } from 'react';
import styled from 'styled-components';
import ChatBox from './components/ChatBox';
import PlaylistDisplay from './components/PlaylistDisplay';
import { apiService, MoodAnalysis, Playlist } from './services/api';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  color: white;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;
`;

const ErrorMessage = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [moodAnalysis, setMoodAnalysis] = useState<MoodAnalysis | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleMoodSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiService.getMoodBasedPlaylists(text);
      setMoodAnalysis(result.moodAnalysis);
      setPlaylists(result.playlists);
      setOriginalText(result.originalText);
    } catch (err) {
      setError('Error al obtener recomendaciones musicales. ¡Inténtalo de nuevo!');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContainer>
      <Container>
        <Header>
          <Title>🎧 Moodify</Title>
          <Subtitle>Música que se adapta a tu estado de ánimo</Subtitle>
        </Header>

        <ChatBox onSubmit={handleMoodSubmit} isLoading={isLoading} />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <PlaylistDisplay
          playlists={playlists}
          moodAnalysis={moodAnalysis}
          originalText={originalText}
        />
      </Container>
    </AppContainer>
  );
}

export default App;
