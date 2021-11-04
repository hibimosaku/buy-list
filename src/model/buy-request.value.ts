//value object 買物要求

export interface BuyRequest {
  readonly _tag: "BuyRequest";
  type: boolean; //ない：false、ほしい:true
}

export function createBuyRequest(status: boolean): BuyRequest {
  return {
    _tag: "BuyRequest",
    type: status,
  };
}
