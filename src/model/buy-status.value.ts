//value object

export interface BuyStatus {
  readonly _tag: "BuyStatus";
  type: "buy" | "nobuy";
}

export function createItemStatus(status: BuyStatus["type"]): BuyStatus {
  return {
    _tag: "BuyStatus",
    type: status,
  };
}
