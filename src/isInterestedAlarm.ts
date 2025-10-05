const alarmKeywords = ["БпЛА", "КАБ"];
const interestedRegions = [
  "нові дома",
  "НД",
  "немишля",
  "слобід",
  "ХТЗ",
  "півндений схід",
  "південь",
];

export function isInterestedAlarm(text: string): boolean {
  const normalized = text.toLowerCase();

  if (!alarmKeywords.some((w) => normalized.includes(w))) {
    return interestedRegions.some((kw) => normalized.includes(kw));
  }
  return false;
}
