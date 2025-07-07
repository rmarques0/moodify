import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const SectionLabel = styled.h3`
  color: white;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
`;

const MoodButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 25px;
`;

const MoodButton = styled.button<{ selected?: boolean }>`
  background: ${props => props.selected 
    ? 'linear-gradient(135deg, #ff6b6b, #ff8e8e)' 
    : 'rgba(255, 255, 255, 0.2)'
  };
  color: white;
  border: ${props => props.selected ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'};
  border-radius: 15px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.selected 
      ? 'linear-gradient(135deg, #ff5252, #ff7979)' 
      : 'rgba(255, 255, 255, 0.3)'
    };
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const DividerText = styled.span`
  color: white;
  margin: 0 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  &::placeholder {
    color: #666;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  border-radius: 15px;
  padding: 8px 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  align-self: flex-end;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface ChatBoxProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const predefinedMoods = [
  { emoji: '😊', text: 'Feliz' },
  { emoji: '😢', text: 'Triste' },
  { emoji: '😴', text: 'Cansado' },
  { emoji: '😌', text: 'Relajado' },
  { emoji: '😍', text: 'Enamorado' },
  { emoji: '😤', text: 'Estresado' },
  { emoji: '🎉', text: 'Celebrando' },
  { emoji: '😔', text: 'Melancólico' },
  { emoji: '💪', text: 'Motivado' },
  { emoji: '🤔', text: 'Pensativo' },
  { emoji: '😇', text: 'En paz' },
  { emoji: '🔥', text: 'Energético' }
];

const ChatBox: React.FC<ChatBoxProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSubmit = selectedMood || message.trim();
    if (textToSubmit && !isLoading) {
      onSubmit(textToSubmit);
      setMessage('');
      setSelectedMood(null);
    }
  };

  const handleMoodSelect = (moodText: string) => {
    if (isLoading) return;
    
    // Si ya está seleccionado, deseleccionar
    if (selectedMood === moodText) {
      setSelectedMood(null);
    } else {
      setSelectedMood(moodText);
      setMessage(''); // Limpiar el input de texto
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      setSelectedMood(null); // Limpiar selección de mood
    }
  };

  const clearSelection = () => {
    setSelectedMood(null);
    setMessage('');
  };

  const hasSelection = selectedMood || message.trim();

  return (
    <ChatContainer>
      <Title>¿Cómo te sientes hoy?</Title>
      
      <SectionLabel>Elige un estado de ánimo:</SectionLabel>
      <MoodButtonsContainer>
        {predefinedMoods.map((mood) => (
          <MoodButton
            key={mood.text}
            selected={selectedMood === mood.text}
            onClick={() => handleMoodSelect(mood.text)}
            disabled={isLoading}
            type="button"
          >
            <span>{mood.emoji}</span>
            <span>{mood.text}</span>
          </MoodButton>
        ))}
      </MoodButtonsContainer>

      {hasSelection && (
        <ClearButton onClick={clearSelection} type="button">
          ✕ Limpiar selección
        </ClearButton>
      )}

      <Divider>
        <DividerText>o describe tu estado</DividerText>
      </Divider>

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <TextInput
            type="text"
            value={message}
            onChange={handleTextChange}
            placeholder={selectedMood ? `Seleccionado: ${selectedMood}` : "Cuéntame cómo te sientes..."}
            disabled={isLoading || !!selectedMood}
          />
          <SendButton type="submit" disabled={isLoading || !hasSelection}>
            {isLoading ? <LoadingSpinner /> : '▶'}
          </SendButton>
        </InputContainer>
      </form>
    </ChatContainer>
  );
};

export default ChatBox; 