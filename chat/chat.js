import { chat, functions, initializeChat } from './initializeChat.js'
import { incorporarDocumentos, incorporarPergunta, leArquivos } from '../embedding.js';

const arquivos = await leArquivos(["Furia_Historia.txt", "Furia_Jogadores.txt", "Furia_Torneios.txt"])
const documentos = await incorporarDocumentos(arquivos);

export async function runChat(message) {
  if (!chat) {
    initializeChat();
  }

  console.log("🚀 ~ runChat ~ (await chat.getHistory()).length:", (await chat.getHistory()).length)
  let doc = await incorporarPergunta(message, documentos);
  let prompt = `Como assistente virtual da FURIA, use as seguintes informações para responder à pergunta do fã: "${message}"\n\nInformações relevantes: ${doc.text}\n\nLembre-se de ser amigável e entusiasmado, sempre mantendo o espírito da FURIA!`;

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