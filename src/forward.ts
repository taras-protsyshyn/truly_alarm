import { TelegramClient } from "telegram";

import { recipients } from "./config.js";

export async function forwardMessage(client: TelegramClient, text: string) {
  for (const username of recipients) {
    try {
      const peer = await client.getInputEntity(username);
      await client.sendMessage(peer, { message: text });
      console.log(`✅ Надіслано ${username}`);
    } catch (err) {
      console.error(`❌ Помилка для ${username}:`, err.message);
    }
  }
}
