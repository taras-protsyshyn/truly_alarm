import settlements from "../../assets/settlements.json" with { type: "json" };

export function isThatKABPoNashuDushu(msg: string): boolean {
  return (
    msg.includes("КАБ") && settlements.some((settlement) => msg.includes(settlement.toLowerCase()))
  );
}
