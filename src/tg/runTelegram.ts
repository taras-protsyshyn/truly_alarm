import input from "input"; // npm install input
import { sessions, TelegramClient } from "telegram";

import { apiHash, apiId } from "../config.js";
import { saveSessionString } from "./saveSessionString.js";

const { StringSession } = sessions;

export const stringSession = new StringSession(process.env.STRING_SESSION || "");

export async function runTelegram() {
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

  return client;
}
