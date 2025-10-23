import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_TOKEN!;
const twilioNumber = process.env.TWILIO_NUMBER!;

const client = twilio(accountSid, authToken);

export async function makeVoiceCall(to: string) {
  const voiceScriptUrl = process.env.VOICE_SCRIPT_URL!;

  const call = await client.calls.create({
    to,
    from: twilioNumber,
    url: voiceScriptUrl,
    method: "GET",
  });

  console.log(`📞 Дзвінок запущено do ${to}`);
  return call.sid;
}
