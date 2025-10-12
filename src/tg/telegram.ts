import { sourceChanel, targetUser } from "../config.js";
import { isInterestedAlarm } from "../isInterestedAlarm.js";
import { forwardToTargetChannel } from "./forwardToTargetChannel.js";
import { listenTgChannel } from "./listenTgChannel.js";
import { runTelegram } from "./runTelegram.js";
import { trackReactionOnMsg } from "./trackReactionOnMsg.js";

export async function startTg() {
  const client = await runTelegram();
  const channel = await client.getEntity(sourceChanel);

  await listenTgChannel({
    channelId: channel.id,
    client,
    validateMessage: isInterestedAlarm,
    onMsg: async (msg) => {
      await forwardToTargetChannel(client, msg);

      await trackReactionOnMsg({
        client,
        chanelEntity: channel,
        msgId: msg.id,
        userName: targetUser,
        reaction: "➕",
      });
    },
  });
}
