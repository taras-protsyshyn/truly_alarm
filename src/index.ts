import input from "input"; // npm install input
import { sessions, TelegramClient } from "telegram";

import { apiHash, apiId, sourceChanel } from "./config.js";
import { forwardToPrivateChannel } from "./forwardToTargetChanel.js";
import { isInterestedAlarm } from "./isInterestedAlarm.js";
import { saveSessionString } from "./saveSessionString.js";

const { StringSession } = sessions;

export const stringSession = new StringSession(process.env.STRING_SESSION || "");

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  if (!process.env.STRING_SESSION) {
    await client.start({
      phoneNumber: async () => await input.text("Enter your phone number: "),
      password: async () => await input.text("Enter your password: "),
      phoneCode: async () => await input.text("Enter the code you received: "),
      onError: (err) => {
        console.log(err);
      },
    });

    const session = client.session.save() as unknown as string;
    saveSessionString(session);
  } else {
    await client.connect();
  }

  const entity = await client.getEntity(sourceChanel); // або просто username без https

  client.addEventHandler(async (update) => {
    const msg = update.message;
    if (msg && msg.peerId?.channelId?.equals(entity.id)) {
      //TODO: потрібно додати логіку яка
      // буде слухати повідомленння тільки тоді коли є тривога

      if (isInterestedAlarm(msg.message)) {
        await forwardToPrivateChannel(client, msg);
      }
    }
  });
})();
