import { makeQuestion } from './question.js';
import { initializeModel } from './model.js';
import { promises as fs } from 'fs'

export async function processesTextFile() {
    const model = await initializeModel()

    const file = await makeQuestion("\nMe informe o caminho e nome do arquivo: ")
    const data = await fs.readFile(file, 'utf-8')

    const prompt = `Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos citados pelos clientes sobre esses destinos. Depois, categorize o percentual de respostas em satisfeito, insatisfeitos ou neutros, colocando no seguinte formato, por exemplo:  
   Satisfeitos: 20% - 20 respostas 
   Insatisfeitos: 50% - 50 respostas
   Neutros: 30% - 30 respostas 
   O total de respostas deve coincidir com o total de opiniões lidas. 
   Opiniões: ${data}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}