//value object 買物要求

export interface BuyRequestNum {
  readonly _tag: "BuyRequestNum";
  readonly num: number;
}

const MIN = 1;
const MAX = 9;

export function createBuyRequestNum(num: number = 1): BuyRequestNum {
  if (num < MIN || num > MAX) throw new Error(`num should be ${MIN} to ${MAX}`);
  return {
    _tag: "BuyRequestNum",
    num,
  };
}
