import { makeQuestion } from './question.js';
import { initializeModel } from './model.js';

export async function freeQuestion() {
    const model = await initializeModel('gemini-exp-1206');
    const prompt = await makeQuestion("Me faça uma pergunta sobre um determinado destino: ");

    const parts = [
        { text: "Você é o chatbot de um site que vende pacotes de viagem." },
        { text: `input: ${prompt}` },
        { text: "output: " },
    ];

    const request = ({
        contents: [{ role: "user", parts }]
    })
    const result = await model.generateContent(request);

    // For text-only input
    const totalTokensInput  = await model.countTokens(request);
    console.log("\n🚀 ~ freeQuestion ~ totalTokensInput:\n", totalTokensInput)
    const response = await result.response;
    const text = response.text();
    console.log(text);

    const totalTokensOutput = await model.countTokens(text)
    console.log("\n🚀 ~ freeQuestion ~ totalTokensOutput:\n", totalTokensOutput)
}