import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { runChat } from './chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(join(__dirname, 'static'), { extensions: ['css', 'svg', 'js'] }));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  try {
    const message = req.body?.message;
    console.log('message do usuário', message)

    if (!message) {
      return res.status(400).json({ error: 'Erro no corpo da requisição' });
    }
    const response = await runChat(message);
    res.json({ response });

  } catch (error) {
    console.error('Error no endpoint do chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
