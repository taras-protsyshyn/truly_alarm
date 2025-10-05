const interestedRegions = [
  "нові дома",
  "Нові Будинки",
  "Нові Дома",
  "Нові будинки",
  "НБ",
  "НД",
  "Немишля",
  "Слобід",
  "немишля",
  "слобід",
  "ХТЗ",
  "півндений схід",
];

export function isInterestedAlarm(text: string): boolean {
  console.log("Checking text:", text);

  return interestedRegions.some((kw) => text.includes(kw));
}
