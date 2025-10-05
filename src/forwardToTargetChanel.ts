import { TelegramClient } from "telegram";

import { targetChanel } from "./config.js";
import { resolveTargetChannel } from "./resolveTargetChannel.js";

export async function forwardToPrivateChannel(
  client: TelegramClient,
  msg: { id: number; message: string; peerId: number }
) {
  try {
    const target = await resolveTargetChannel(client, targetChanel);

    // // Варіант 1: forward
    await client.forwardMessages(target, {
      fromPeer: msg.peerId,
      messages: [msg.id],
    });

    // Варіант 2: копіювання тексту
    // await client.sendMessage(target, { message: msg.message });

    console.log("📨 Переслано в приватний канал");
  } catch (err) {
    console.error("❌ Не вдалося переслати:", err.message);
  }
}
