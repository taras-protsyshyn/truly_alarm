import { TelegramClient } from "telegram";

import { targetChanel } from "../config.js";
import { resolveTargetChannel } from "./resolveTargetChannel.js";

export async function forwardToTargetChannel(
  client: TelegramClient,
  msg: { id: number; message: string; peerId: number }
) {
  try {
    const target = await resolveTargetChannel(client, targetChanel);

    await client.forwardMessages(target, {
      fromPeer: msg.peerId,
      messages: [msg.id],
    });

    console.log("📨 Переслано в приватний канал");
  } catch (err) {
    console.error("❌ Не вдалося переслати:", err.message);
  }
}
