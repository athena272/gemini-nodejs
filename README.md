# FURIA Bot - Chatbot da FURIA Esports para fãs
 
Um chatbot inteligente desenvolvido para fãs da FURIA Esports, especializado em Counter-Strike. O bot utiliza a API do Google Gemini para fornecer informações precisas e atualizadas sobre o time, jogadores, torneios e muito mais.

## 🔨 Objetivos do projeto

- Desenvolver um Chatbot com JavaScript e Node.js integrado com o Google Gemini;
- Gerenciar o histórico de troca de mensagens;
- Criar funções dinâmicas com o recurso de Function Calling da API;
- Incorporar documentos personalizados para auxiliar nas resposta, com o recurso de embeddings;

## Funcionalidades

- Informações sobre o time e jogadores
- Próximos jogos e torneios
- Histórico de conquistas
- Estatísticas e rankings
- Sistema de embeddings para respostas personalizadas
- Interface moderna e responsiva

## Tecnologias Utilizadas

- Node.js
- Express.js
- Google Gemini API
- HTML5
- CSS3
- JavaScript

## Requisitos

- Node.js 18 ou superior
- NPM ou PNPM
- Chave de API do Google Gemini

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/furia-bot.git
cd furia-bot
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
```
GEMINI_API_KEY=sua_chave_api_aqui
```

4. Inicie o servidor:
```bash
npm start
# ou
pnpm start
```

## Estrutura do Projeto

```
furia-bot/
├── chat/
│   ├── chat.js
│   └── initializeChat.js
├── static/
│   ├── style.css
│   └── furia-logo.svg
├── Furia_Historia.txt
├── Furia_Jogadores.txt
├── Furia_Torneios.txt
├── app.js
├── embedding.js
└── index.html
```

## Contribuição

Contribuições são bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para mais informações sobre o projeto, entre em contato através do email: guilhermera272@gmail.com
