import { TelegramClient } from "telegram";
import { Entity } from "telegram/define.js";

export async function resolveTargetChannel(
  client: TelegramClient,
  channelName: string
): Promise<Entity> {
  const dialogs = await client.getDialogs();

  const match = dialogs.find((dialog) => {
    return dialog.name === channelName && dialog.entity.className === "Chat";
  });

  if (!match) {
    throw new Error(`❌ Канал "${channelName}" не знайдено серед діалогів`);
  }

  return match.entity;
}
