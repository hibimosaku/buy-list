//value object

export interface BuyResult {
  readonly _tag: "BuyResult";
  type: boolean; //trueなら買った、falseなら買わなかった
  day: string | null;
}

export function createBuyResult(
  status: BuyResult["type"],
  day: string | null
): BuyResult {
  return {
    _tag: "BuyResult",
    type: status,
    day,
  };
}
