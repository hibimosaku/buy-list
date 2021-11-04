//value object

export interface BuyResult {
  readonly _tag: "BuyResult";
  type: boolean; //trueなら買った、falseなら買わなかった
  day: string;
}

export function createBuyStatus(
  status: BuyResult["type"],
  day: string
): BuyResult {
  return {
    _tag: "BuyResult",
    type: status,
    day,
  };
}
