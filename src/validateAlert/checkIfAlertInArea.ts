import { targetArea } from "../config.js";

export async function checkIfAlarmInArea(): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.alerts.in.ua/v1/iot/active_air_raid_alerts/${targetArea}.json?token=${process.env.ALERTSUA_TOKEN}`
    );

    const data = (await res.json()) as "A" | "N" | "P";

    console.log("Перевірка тривоги в Харкові:", data);

    return data === "A" || data === "P";
  } catch (error) {
    console.error("❌ Помилка при перевірці тривоги:", error);
    return true; // на випадок помилки вважати, що тривога є
  }
}
