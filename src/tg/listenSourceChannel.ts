import { BigInteger } from "big-integer";
import { TelegramClient } from "telegram";

type TgSourceChannelListener = {
  channelId: BigInteger;
  client: TelegramClient;
  onMsg: (msg: any) => void;
  validateMessage: (msg: string) => boolean;
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
      if (validateMessage(msg.message)) {
        await onMsg(msg);
      }
    }
  });
}
