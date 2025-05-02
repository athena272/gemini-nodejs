import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { runChat } from './chat/chat.js';
import { initializeChat } from './chat/initializeChat.js';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middlewares de segurança e performance
app.use(helmet()); // Adiciona headers de segurança
app.use(compression()); // Comprime as respostas
app.use(cors()); // Permite requisições cross-origin
app.use(express.json({ limit: '1mb' })); // Limita o tamanho do JSON

// Configuração de arquivos estáticos com cache em produção
const staticOptions = {
  extensions: ['css', 'svg', 'js'],
  maxAge: isProduction ? '1d' : 0 // Cache de 1 dia em produção
};
app.use('/static', express.static(join(__dirname, 'static'), staticOptions));

// Rota principal
app.get('/', (req, res) => {
  try {
    initializeChat();
    res.sendFile(join(__dirname, 'index.html'));
  } catch (error) {
    console.error('Erro ao inicializar o chat:', error);
    res.status(500).send('Erro ao inicializar o chat');
  }
});

// Rota do chat
app.post('/', async (req, res) => {
  try {
    const message = req.body?.message;
    console.log('Mensagem do usuário:', message);

    if (!message) {
      return res.status(400).json({ error: 'Erro no corpo da requisição' });
    }

    const response = await runChat(message);
    res.json({ response });

  } catch (error) {
    console.error('Erro no endpoint do chat:', error);
    res.status(500).json({ 
      error: isProduction ? 'Erro interno do servidor' : error.message 
    });
  }
});

// Rota de health check para monitoramento
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ 
    error: isProduction ? 'Erro interno do servidor' : err.message 
  });
});

// Inicialização do servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
});

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
});
