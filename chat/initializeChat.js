import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat

function initializeChat() {
    chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens." }],
            },
            {
                role: "model",
                parts: [{ text: "Olá! Obrigado por entrar em contato com o Jornada Viagens. Antes de começar a responder sobre suas dúvidas, preciso do seu nome e endereço de e-mail." }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
}

export { chat, initializeChat }