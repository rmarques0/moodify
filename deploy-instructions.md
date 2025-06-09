# 🚀 DEPLOY MOODIFY - INSTRUÇÕES COMPLETAS

## Opção 1: VERCEL (Recomendado - 15 min)

### Pré-requisitos:
1. Conta no GitHub (já tem)
2. Conta no Vercel (criar gratis em vercel.com)
3. Ter a OpenAI API Key

### Passo 1: Preparar Repositório
```bash
# No terminal do projeto:
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Passo 2: Deploy no Vercel
1. Acesse https://vercel.com
2. Login com GitHub
3. "Import Project" → selecionar repositório moodify
4. Configurar variáveis de ambiente:
   - `OPENAI_API_KEY` = sua_key_aqui
   - `NODE_ENV` = production
   - `SPOTIFY_CLIENT_ID` = a248cf4bf2264ad892afc2fbefa35705

### Passo 3: URL Final
- Frontend: https://moodify-xxx.vercel.app
- Backend: https://moodify-xxx.vercel.app/api

## Opção 2: NETLIFY + RAILWAY (20 min)

### Frontend (Netlify):
1. netlify.com → "New site from Git"
2. Selecionar repo → pasta "frontend"
3. Build command: `npm run build`
4. Publish directory: `build`

### Backend (Railway):
1. railway.app → "Deploy from GitHub"
2. Selecionar repo → pasta "backend"
3. Adicionar variáveis de ambiente

## Opção 3: DEMO RÁPIDO (5 min)
Se quiser apenas para apresentação hoje:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start

# Usar ngrok para expor localhost:
ngrok http 3000
```

## 🎯 URLs Finais Esperadas:
- Demo: https://moodify-demo.vercel.app
- API: https://moodify-demo.vercel.app/api/mood/analyze

## 🔥 Para a Apresentação:
"Aplicação está online em [URL]. Podem testar agora mesmo em seus celulares!" 