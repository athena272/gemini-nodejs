import 'dotenv/config';
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const functions = {
    installmentInterestRate: ({ value }) => {
        const months = typeof value === "string" ? parseInt(value) : value;
        if (months <= 6) {
            return 3;
        } else if (months <= 12) {
            return 5;
        } else if (months <= 24) {
            return 7;
        }
    }
};

const tools = [
    {
        functionDeclarations: [
            {
                name: "installmentInterestRate",
                description: "Retorna a taxa de juros para parcelamento baseado na quantidade de meses",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        value: { type: FunctionDeclarationSchemaType.NUMBER },
                    },
                    required: ["value"],
                }
            }
        ]
    }
]

// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", tools });

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