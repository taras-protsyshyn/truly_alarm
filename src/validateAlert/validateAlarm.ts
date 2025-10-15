import { checkIfAlertInInterestedArea } from "./checkIfAlertInInterestedArea.js";
import { isThatKABPoNashuDushu } from "./isThatKABPoNashuDushu.js";
import { validateCityRegion } from "./validateCityRegion.js";

// TODO: глобальні змінні - погана практика, треба буде переробити
let alarm = false;
let lastAlarmCheck = 0;

export async function validateAlarm(text: string): Promise<boolean> {
  console.log(`${alarm ? "Перевіряємо" : "Ігноруємо повідомлення:"}`, text);

  // перевіряємо чи є в тексті ключові слова
  if (alarm && (isThatKABPoNashuDushu(text) || validateCityRegion(text))) {
    return true;
  }

  await toggleAttention(text);

  return false;
}

async function checkAlertAfterTimeOut() {
  const ALARM_TIMEOUT = 60 * 60 * 1000;

  if (alarm && Date.now() - lastAlarmCheck > ALARM_TIMEOUT) {
    alarm = await checkIfAlertInInterestedArea();
    if (alarm) {
      lastAlarmCheck = Date.now();
    }
  }
}

async function toggleAttention(text: string) {
  const lowerText = text.toLowerCase();

  // аби відсіяти різного роду спам повідомлення які не стосуються тривог
  // перевіряємо чи є в тексті слова повязані з тривогою
  if (lowerText.includes("тривога") || lowerText.includes("відбій")) {
    // якщо так, робимо контрольну перевірку через API,
    // якщо буде true то це перевед нашу логіку в режим підвищеної уваги
    // і наступного разу перевірка по ключовим словам пропустить повідомлення
    // для подальшої ескалації тривоги
    alarm = await checkIfAlertInInterestedArea();

    if (alarm) {
      lastAlarmCheck = Date.now();
    }
  } else {
    await checkAlertAfterTimeOut();
  }
}
