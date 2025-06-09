import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const LanguageSelect = styled.select`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <SelectorContainer>
      <LanguageSelect
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </LanguageSelect>
    </SelectorContainer>
  );
};

export default LanguageSelector; 