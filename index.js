import { makeQuestion } from './js/question.js';
import { freeQuestion } from './js/freeQuestion.js';
import { destinationQuery } from './js/destinationQuery.js';

async function main() {
    const choice = await makeQuestion(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  \nOpção desejada: `)

    if (choice === '1') {
        await freeQuestion()
    } else if (choice === '2') {
        await destinationQuery()
    } else {
        console.log('Invalid choice')
    }
}

main()