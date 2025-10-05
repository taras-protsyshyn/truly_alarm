import { TelegramClient } from "telegram";
import { Api } from "telegram";

export async function resolveTargetChannel(
  client: TelegramClient,
  channelName: string
): Promise<Api.InputPeerChannel> {
  const dialogs = await client.getDialogs();

  const match = dialogs.find(
    (dialog) => dialog.name === channelName && dialog.entity.className === "Channel"
  );

  if (!match) {
    throw new Error(`❌ Канал "${channelName}" не знайдено серед діалогів`);
  }

  const channel = match.entity as Api.Channel;

  return new Api.InputPeerChannel({
    channelId: channel.id,
    accessHash: channel.accessHash!,
  });
}
