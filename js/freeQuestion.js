import { makeQuestion } from './question.js';
import { initializeModel } from './model.js';

export async function freeQuestion() {
    const model = await initializeModel('gemini-exp-1206');
    const prompt = await makeQuestion("Me faça uma pergunta sobre um determinado destino: ");

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