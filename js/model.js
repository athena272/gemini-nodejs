import { GoogleGenerativeAI } from '@google/generative-ai';

export async function initializeModel(modelParam = 'gemini-1.5-flash') {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: modelParam });

    return model
}