import { sourceChanel, targetGroup } from "../config.js";
import { validateAlarm } from "../validateAlert/validateAlarm.js";
import { forwardToTargetGroup } from "./forwardToTargetGroup.js";
import { listenSourceChannel } from "./listenSourceChannel.js";
import { resolveTargetGroup } from "./resolveTargetGroup.js";
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

  const sourceChEntity = await client.getEntity(sourceChanel);
  const targetGroupEntity = await resolveTargetGroup(client, targetGroup);

  await listenSourceChannel({
    channelId: sourceChEntity.id,
    client,
    validateMessage: validateAlarm,
    onMsg: async (msg) => {
      await forwardToTargetGroup({
        client,
        source: sourceChEntity,
        target: targetGroupEntity,
        msg,
      });

      await trackReactionOnMsg({
        client,
        chanelEntity: targetGroupEntity,
        userName: targetUser,
        onSkipUserReaction,
      });
    },
  });
}
