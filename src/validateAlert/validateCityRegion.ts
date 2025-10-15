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

export function validateCityRegion(text: string): boolean {
  return interestedRegions.some((kw) => text.includes(kw));
}
