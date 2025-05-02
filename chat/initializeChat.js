import 'dotenv/config';
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const functions = {
    getNextMatch: ({ team }) => {
        // Simulação de dados de próximos jogos
        const matches = {
            "furia": {
                nextMatch: "FURIA vs Cloud9",
                date: "2024-03-25",
                tournament: "ESL Pro League Season 19"
            }
        };
        return matches[team.toLowerCase()] || "Nenhum jogo agendado";
    },
    getTeamStats: ({ team }) => {
        // Simulação de estatísticas do time
        const stats = {
            "furia": {
                ranking: "Top 10 Mundial",
                recentResults: "3 vitórias, 2 derrotas",
                players: ["KSCERATO", "yuurih", "arT", "drop", "chelo"]
            }
        };
        return stats[team.toLowerCase()] || "Dados não disponíveis";
    }
};

const tools = [
    {
        functionDeclarations: [
            {
                name: "getNextMatch",
                description: "Retorna informações sobre o próximo jogo do time",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        team: { type: FunctionDeclarationSchemaType.STRING },
                    },
                    required: ["team"],
                }
            },
            {
                name: "getTeamStats",
                description: "Retorna estatísticas e informações sobre o time",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        team: { type: FunctionDeclarationSchemaType.STRING },
                    },
                    required: ["team"],
                }
            }
        ]
    }
]

// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat

function initializeChat() {
    chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Você é FURIA Bot, um assistente virtual oficial da FURIA Esports, especializado em Counter-Strike. Você ajuda fãs com informações sobre o time, jogadores, próximos jogos, estatísticas e história da organização. Você é apaixonado por CS e conhece profundamente o cenário competitivo." }],
            },
            {
                role: "model",
                parts: [{ text: "Olá! Sou o FURIA Bot, seu assistente virtual para tudo sobre a FURIA no Counter-Strike! Posso te ajudar com informações sobre o time, jogadores, próximos jogos, estatísticas e muito mais. Como posso te ajudar hoje?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
}

export { chat, initializeChat, functions }