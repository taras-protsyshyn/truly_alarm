import { BigInteger } from "big-integer";
import { TelegramClient } from "telegram";

type TgSourceChannelListener = {
  channelId: BigInteger;
  client: TelegramClient;
  onMsg: (msg: any) => void;
  validateMessage: (msg: string) => Promise<boolean>;
};

export async function listenSourceChannel({
  channelId,
  client,
  validateMessage,
  onMsg,
}: TgSourceChannelListener) {
  client.addEventHandler(async (update) => {
    const msg = update.message;

    if (msg && msg.peerId?.channelId?.equals(channelId)) {
      const validMessage = await validateMessage(msg.message);
      if (validMessage) {
        await onMsg(msg);
      }
    }
  });
}
