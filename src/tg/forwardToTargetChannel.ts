import { Api, TelegramClient } from "telegram";
import { Entity } from "telegram/define.js";

export async function forwardToTargetChannel({
  client,
  target,
  source,
  msg,
}: {
  client: TelegramClient;
  msg: { id: number; message: string; peerId: number };
  source: Entity;
  target: Entity;
}) {
  try {
    await client.invoke(
      new Api.messages.ForwardMessages({
        fromPeer: source,
        id: [msg.id],
        toPeer: target,
        dropAuthor: false,
        withMyScore: false,
      })
    );

    console.log("📨 Переслано в приватну групу");
  } catch (err) {
    console.error("❌ Не вдалося переслати:", err.message);
  }
}
