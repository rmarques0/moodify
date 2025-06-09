# 🎧 Projeto: Moodify – Música adaptada ao estado emocional do usuário

## 🧠 Objetivo
Desenvolver um MVP de uma aplicação web que, por meio de uma interface de chat, interpreta o estado emocional ou contexto do usuário e gera uma playlist personalizada usando a API do Spotify.

## 🧩 Funcionalidades do MVP
- Chat interativo onde o usuário descreve como se sente ou o que está fazendo.
- Processamento de linguagem natural (NLP) para interpretar a entrada e mapear emoções/atividades.
- Busca de playlists na API do Spotify com base nesse mapeamento.
- Reproduzir ou linkar a playlist recomendada.

## 🧱 Arquitetura sugerida

### Frontend
- Framework: React
- Componentes:
  - ChatBox (entrada do usuário)
  - PlaylistDisplay (playlist retornada)
- Estilo: simples e responsivo

### Backend
- Stack: Node.js + Express
- Rotas:
  - POST /mood → recebe texto do usuário e retorna a emoção/contexto identificado
  - GET /playlist → retorna playlist baseada na emoção/contexto
- Integrações:
  - API OpenAI (ou regra simples de NLP local para MVP)
  - API Spotify (auth + busca de playlists)

### Autenticação
- OAuth 2.0 com Spotify para buscar e tocar músicas

## 📦 Tecnologias e libs
- React + Vite ou Create React App
- Node.js + Express
- Axios (chamadas HTTP)
- dotenv (variáveis de ambiente)
- OpenAI ou HuggingFace (opcional)
- Spotify Web API

## 🪜 Etapas para desenvolvimento

1. Criar repositório e estrutura de pastas (frontend/backend separados)
2. Implementar o frontend com chat e integração com o backend
3. Configurar backend com rota para processar texto e chamar a API do Spotify
4. Configurar autenticação OAuth com Spotify
5. Implementar lógica de mapeamento simples (ex: “estou cansado” → relax)
6. Buscar playlists relacionadas no Spotify com base nesse mapeamento
7. Mostrar playlist retornada no frontend
8. (Opcional) permitir feedback do usuário

## 🧪 Testes e validação
- Testar com entradas variadas no chat
- Verificar se playlists são coerentes com os estados descritos
- Avaliar tempo de resposta e fluidez do uso

## 💬 Ideia futura (V2)
Mencionar a possibilidade de adicionar um “mapa musical colaborativo”, onde usuários possam associar músicas a lugares da cidade. Essa funcionalidade não será implementada no MVP, apenas mencionada como evolução futura do produto.