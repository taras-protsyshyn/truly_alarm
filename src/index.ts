import input from "input"; // npm install input
import { sessions, TelegramClient } from "telegram";

import { apiHash, apiId, channelUsername } from "./config.js";
import { forwardMessage } from "./forward.js";
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

  console.log("You are now connected!");

  const entity = await client.getEntity(channelUsername); // або просто username без https

  client.addEventHandler(async (update) => {
    const msg = update.message;
    if (msg && msg.peerId?.channelId?.equals(entity.id)) {
      if (isInterestedAlarm(msg.message)) {
        await forwardMessage(client, msg.message);
      }
    }
  });
})();

//
