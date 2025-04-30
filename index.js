import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { makeQuestion } from './question.js';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = await makeQuestion("O que você deseja saber sobre o time de CS da fúria?: ")

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();