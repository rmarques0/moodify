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

interface ChatBoxProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <Title>¿Cómo te sientes hoy?</Title>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <TextInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Cuéntame cómo te sientes..."
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? <LoadingSpinner /> : '▶'}
          </SendButton>
        </InputContainer>
      </form>
    </ChatContainer>
  );
};

export default ChatBox; 