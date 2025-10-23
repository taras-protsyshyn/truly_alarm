import { targetUser, targetUserPhoneNumber } from "./config.js";
import { startTg } from "./tg/telegram.js";
import { makeVoiceCall } from "./twilio.js";

await startTg({
  targetUser,
  onSkipUserReaction: async () => {
    console.log("⚠️ Користувач не відреагував => дзвінок на його мобільний");
    await makeVoiceCall(targetUserPhoneNumber);
  },
});
