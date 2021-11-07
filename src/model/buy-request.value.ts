//value object 買物要求

export interface BuyRequest {
  readonly _tag: "BuyRequest";
  type: boolean; //ない：false、ほしい:true 在庫はないと認識
}

export function createBuyRequest(request: boolean): BuyRequest {
  return {
    _tag: "BuyRequest",
    type: request,
  };
}
