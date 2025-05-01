import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { makeQuestion } from './js/question.js';
import { initializeModel } from './js/model.js';

const model = initializeModel('gemini-exp-1206')

export async function freeQuestion() {
    const prompt = await fazerPergunta("Me faça uma pergunta sobre um determinado destino: ");

    const parts = [
        {text: "Você é o chatbot de um site que vende pacotes de viagem." },
        {text: `input: ${prompt}`},
        {text: "output: "},
      ];

    const result = await model.generateContent(
        { contents: [{ role: "user", parts }] }
    );
    const response = await result.response;
    const text = response.text();
    console.log(text);
}