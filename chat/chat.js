import { chat } from './initializeChat.js'

export async function runChat(message) {
  console.log("🚀 ~ runChat ~ (await chat.getHistory()).length:", (await chat.getHistory()).length)
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}