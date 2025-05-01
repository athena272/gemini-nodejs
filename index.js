import { makeQuestion } from './js/question.js';
import { freeQuestion } from './js/freeQuestion.js';
import { destinationQuery } from './js/destinationQuery.js';
import { processesImage } from './js/processesImages.js';

async function main() {
    const choice = await makeQuestion(`Escolha uma das opções abaixo: \n
1. Fazer uma pergunta livre sobre um destino;
2. Comparação de destinos por categorias;
3. Ver informações com base em uma imagem;
\nOpção desejada: `)

    if (choice === '1') {
        await freeQuestion()
    } else if (choice === '2') {
        await destinationQuery()
    } else if (choice === '3') {
        const image = await makeQuestion('\nMe informe o caminho completo e nome da imagem: ')
        await processesImage(image)
    }
    else {
        console.log('Invalid choice')
    }
}

main()