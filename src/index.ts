import { targetUser } from "./config.js";
import { startTg } from "./tg/telegram.js";

await startTg({
  targetUser,
  onSkipUserReaction: () => {
    console.log("⚠️ Користувач не відреагував => маєа бути дзвінок на його мобільний");
  },
});
