import { Api, TelegramClient } from "telegram";
import { Entity } from "telegram/define.js";

export async function trackReactionOnMsg({
  client,
  chanelEntity,
  userName,
  delayMs = 10_000,
  onSkipUserReaction,
}: {
  chanelEntity: Entity;
  client: TelegramClient;
  delayMs?: number;
  onSkipUserReaction: () => void;
  userName: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const messages = await client.getMessages(chanelEntity, { limit: 1 });
  const lastMessage = messages[0];

  try {
    const result = await client.invoke(
      new Api.messages.GetMessageReactionsList({
        peer: chanelEntity,
        id: lastMessage.id,
        limit: 100,
      })
    );

    const user = await client.getEntity(userName);

    const isUserReacted = result.reactions.some((r) => {
      return r.peerId.className === "PeerUser" && r.peerId.userId?.equals(user.id);
    });

    console.log(
      `👤 Користувач ${userName} ${isUserReacted ? "відреагував" : "не відреагував"} на повідомлення`
    );

    if (!isUserReacted) onSkipUserReaction();
  } catch (err) {
    console.error(`❌ користувач ${userName}, не відреагував на повідомлення: ${err.message}`);
    onSkipUserReaction();
    return;
  }
}
