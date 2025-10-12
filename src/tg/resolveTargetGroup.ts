import { TelegramClient } from "telegram";
import { Entity } from "telegram/define.js";

export async function resolveTargetGroup(
  client: TelegramClient,
  groupName: string
): Promise<Entity> {
  const dialogs = await client.getDialogs();

  const match = dialogs.find((dialog) => {
    return dialog.name === groupName && dialog.entity.className === "Chat";
  });

  if (!match) {
    throw new Error(`❌ Групу "${groupName}" не знайдено серед діалогів`);
  }

  return match.entity;
}
