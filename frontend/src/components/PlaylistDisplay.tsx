import React from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const MoodAnalysisCard = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  color: white;
  text-align: center;
`;

const MoodText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const MoodDetails = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const MoodTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const PlaylistCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const PlaylistImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const PlaylistName = styled.h4`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
`;

const PlaylistDescription = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const OpenSpotifyButton = styled.a`
  display: inline-block;
  background: #1db954;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: #1ed760;
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const EmptyText = styled.p`
  font-size: 18px;
  margin: 0;
`;

interface Playlist {
  id: string;
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
}

interface MoodAnalysis {
  emotion: string;
  searchTerms: string[];
  confidence?: number;
  language?: string;
}

interface PlaylistDisplayProps {
  playlists: Playlist[];
  moodAnalysis: MoodAnalysis | null;
  originalText: string;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({
  playlists,
  moodAnalysis,
  originalText,
}) => {
  if (!moodAnalysis) {
    return (
      <PlaylistContainer>
        <EmptyState>
          <EmptyIcon>🎵</EmptyIcon>
          <EmptyText>¡Cuéntame cómo te sientes y encontraré la música perfecta para ti!</EmptyText>
        </EmptyState>
      </PlaylistContainer>
    );
  }

  return (
    <PlaylistContainer>
      <SectionTitle>Listas de Reproducción Perfectas para tu Estado de Ánimo</SectionTitle>
      
      <MoodAnalysisCard>
        <MoodText>"{originalText}"</MoodText>
        <MoodDetails>
          <MoodTag>😊 {moodAnalysis.emotion}</MoodTag>
          {moodAnalysis.searchTerms.map((term, index) => (
            <MoodTag key={index}>🎵 {term}</MoodTag>
          ))}
          {moodAnalysis.language && (
            <MoodTag>🌍 {moodAnalysis.language.toUpperCase()}</MoodTag>
          )}
          {moodAnalysis.confidence && (
            <MoodTag>🎯 {Math.round(moodAnalysis.confidence * 100)}% confident</MoodTag>
          )}
        </MoodDetails>
      </MoodAnalysisCard>

      {playlists.length > 0 ? (
        <PlaylistGrid>
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id}>
              {playlist.images && playlist.images.length > 0 && (
                <PlaylistImage
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <PlaylistName>{playlist.name}</PlaylistName>
              {playlist.description && (
                <PlaylistDescription>{playlist.description}</PlaylistDescription>
              )}
              <OpenSpotifyButton
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Spotify
              </OpenSpotifyButton>
            </PlaylistCard>
          ))}
        </PlaylistGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyText>
            No se encontraron listas para tu estado de ánimo. ¡Intenta describir tus sentimientos de otra manera!
          </EmptyText>
        </EmptyState>
      )}
    </PlaylistContainer>
  );
};

export default PlaylistDisplay; 