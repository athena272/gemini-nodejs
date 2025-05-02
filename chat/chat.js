import { chat, functions, initializeChat } from './initializeChat.js'
import { incorporarDocumentos, incorporarPergunta, leArquivos } from '../embedding.js';

const arquivos = await leArquivos("Pacotes_Argentina.txt", "Pacotes_EUA.txt", "Politicas.txt")
const documentos = await incorporarDocumentos(
  [
    "A política de cancelamento é de 30 dias antes da viagem, caso contrário, não faremos o reembolso",
    "Viagem para a Disney, 6 dias, R$ 20.000,00 - Viagem para a Disney, 10 dias, R$ 25.000,00"
  ]
);

export async function runChat(message) {
  if (!chat) {
    initializeChat();
  }

  console.log("🚀 ~ runChat ~ (await chat.getHistory()).length:", (await chat.getHistory()).length)
  let doc = await incorporarPergunta(message, documentos);
  let prompt = message + " talvez esse trecho te ajude a formular a resposta " + doc.text;

  const result = await chat.sendMessage(prompt);
  const response = await result.response;

  const content = response.candidates[0].content;

  const fc = content.parts[0].functionCall;
  const text = content.parts.map(({ text }) => text).join("");
  console.log(text);
  console.log(fc);

  if (fc) {
    const { name, args } = fc;
    const fn = functions[name];
    if (!fn) {
      throw new Error(`Unknown function "${name}"`);
    }
    const fr = {
      functionResponse: {
        name,
        response: {
          name,
          content: functions[name](args),
        }
      },
    }

    console.log(fr)

    const request2 = [fr];
    const response2 = await chat.sendMessage(request2);
    const result2 = response2.response;
    return result2.text();
  } else if (text) {
    return text;
  }
}