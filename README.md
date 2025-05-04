# Gemini Chatbot — FURIA Esports 💬🔥

Este projeto é um chatbot interativo construído com Node.js e a API do Google Gemini para responder perguntas sobre a equipe FURIA Esports. A aplicação usa embeddings locais e contexto semântico para gerar respostas precisas com base em arquivos fornecidos.

🔗 **Acesse a versão em produção**:  
👉 https://gemini-nodejs-sdoz.onrender.com

---

## ✨ Funcionalidades

- 🤖 Chat com IA (Google Gemini) para responder dúvidas sobre:
  - História da FURIA
  - Jogadores
  - Participações em torneios
- 📂 Carregamento e leitura de documentos `.txt`
- 🔎 Busca por similaridade semântica com embeddings
- 🌐 Interface web estilizada e responsiva

---

## 🧰 Tecnologias utilizadas

| Tecnologia    | Descrição                                 |
|---------------|---------------------------------------------|
| Node.js       | Backend da aplicação                       |
| Express       | Servidor HTTP                              |
| Google Gemini | API de geração de respostas com IA         |
| Embeddings    | Comparação semântica entre perguntas e contexto |
| HTML/CSS      | Interface de usuário                       |
| JavaScript    | Lógica de frontend                         |
| Render        | Hospedagem gratuita da aplicação           |

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gemini-nodejs.git
cd gemini-nodejs
```
### 2. Instale as dependênc
```
npm install
```
### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
### Edite o .env com sua chave da API do Gemini:
```bash
GEMINI_API_KEY=coloque-sua-chave-aqui
```
🔐 Importante: Nunca compartilhe a chave real no repositório. Use .env localmente e .env.example no GitHub.
### 4. Rode o servidor
```bash
node app.js
```
### 5. Acesso no navegador
```bash
http://localhost:3000
```

## 🗂️ Estrutura do Projeto
```
gemini-nodejs/
├── app.js                     # Servidor principal
├── embedding.js               # Embedding e busca semântica
├── chat/                      # Scripts de inicialização do chatbot
│   ├── chat.js
│   └── initializeChat.js
├── static/                    # Estilos, ícones e imagens
│   ├── css/
│   └── img/
├── index.html                 # Página principal
├── Furia_Historia.txt         # Conteúdo da base de conhecimento
├── Furia_Jogadores.txt
├── Furia_Torneios.txt
├── .env.example               # Exemplo de configuração
├── package.json
├── README.md
```

## ☁️ Deploy
Este projeto está publicado gratuitamente com [Render.](https://render.com/)
Acesse aqui:
➡️ https://gemini-nodejs-sdoz.onrender.com

Para fazer seu próprio deploy no Render:
- Crie uma conta em https://render.com
- Conecte seu repositório GitHub
- Crie um novo Web Service:
- Build Command: npm install
- Start Command: node app.js
- Node Version: 20+
- Adicione a variável de ambiente GEMINI_API_KEY nas Settings do projeto

## 👨‍💻 Autor
Desenvolvido por Guilherme como parte de um desafio técnico de integração de IA com coleta de dados no universo de eSports.

## 🧠 Observações
- Os arquivos Furia_*.txt são carregados na inicialização e usados para embasamento das respostas.

- As perguntas feitas no chat são comparadas semanticamente com frases dos arquivos.

- A IA responde com base nos trechos mais relevantes (top 3 similares).
