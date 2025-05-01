import { initializeModel } from './model.js';
import { readFileSync } from 'fs'

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

export async function processesImage(image) {
    const model = await initializeModel('gemini-1.5-flash')

    const prompt = "Me fale tudo que puder sobre o destino mostrado nessa imagem";

    const imageParts = [
        fileToGenerativePart(image, "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
} 