//value object

export interface ItemStatus {
  readonly _tag: "ItemStatus";
  type: boolean; //ない：false、ほしい:true
}

export function createItemStatus(status: boolean): ItemStatus {
  return {
    _tag: "ItemStatus",
    type: status,
  };
}
