//value object

export interface BuyStatus {
  readonly _tag: "BuyStatus";
  type: boolean; //trueなら買った、falseなら買わなかった
}

export function createItemStatus(status: BuyStatus["type"]): BuyStatus {
  return {
    _tag: "BuyStatus",
    type: status,
  };
}
