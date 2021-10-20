//value object

export interface BuyStatus {
  readonly _tag: "BuyStatus";
  type: boolean; //trueなら買った、falseなら買わなかった
  day: string;
}

export function createBuyStatus(
  status: BuyStatus["type"],
  day: string
): BuyStatus {
  return {
    _tag: "BuyStatus",
    type: status,
    day,
  };
}
