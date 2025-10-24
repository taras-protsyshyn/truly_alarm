import twilio from "twilio";

import { twilioAccountSid, twilioAuthToken, twilioNumber } from "./config.js";

const client = twilio(twilioAccountSid, twilioAuthToken);

const voiceScript =
  '<Response><Say voice="alice" language="en-US">Attention! Critical event! This is an automated call.</Say></Response>';

export async function makeVoiceCall(to: string) {
  const call = await client.calls.create({
    to,
    from: twilioNumber,
    twiml: voiceScript,
  });

  console.log(` 📞 Дзвінок створено: ${call.sid}`);

  return call.sid;
}
