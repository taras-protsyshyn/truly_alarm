import { sourceChanel, targetChanel } from "../config.js";
import { isInterestedAlarm } from "../isInterestedAlarm.js";
import { forwardToTargetChannel } from "./forwardToTargetChannel.js";
import { listenSourceChannel } from "./listenSourceChannel.js";
import { resolveTargetChannel } from "./resolveTargetChannel.js";
import { runTelegram } from "./runTelegram.js";
import { trackReactionOnMsg } from "./trackReactionOnMsg.js";

export async function startTg({
  targetUser,
  onSkipUserReaction,
}: {
  onSkipUserReaction?: () => void;
  targetUser: string;
}) {
  const client = await runTelegram();

  const sourceCh = await client.getEntity(sourceChanel);
  const targetCh = await resolveTargetChannel(client, targetChanel);

  await listenSourceChannel({
    channelId: sourceCh.id,
    client,
    validateMessage: isInterestedAlarm,
    onMsg: async (msg) => {
      await forwardToTargetChannel({ client, source: sourceCh, target: targetCh, msg });

      await trackReactionOnMsg({
        client,
        chanelEntity: targetCh,
        userName: targetUser,
        onSkipUserReaction,
      });
    },
  });
}
