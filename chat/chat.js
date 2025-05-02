import { chat } from './initializeChat.js'

export async function runChat(message) {
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}