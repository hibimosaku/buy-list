//集約

import { BuyStatus } from "./buy-status.value";
import { Category } from "./category.model";
import { ItemStatus } from "./item-status.value";
import { Item } from "./item.model";

// export type ItemList = Array<{
//   readonly _tag: "ItemList";
//   item:Item
//   categoryId: Category["id"];
//   itemStatus: ItemStatus["type"];
//   buyStatus: BuyStatus["type"];
// }>;

export interface ItemList {
  readonly _tag: "ItemList";
  item: Item;
  categoryId: Category["id"];
  itemStatus: ItemStatus["type"];
  buyStatus: BuyStatus["type"];
}

export function createItemGroup(
  item: Item,
  categoryId: Category["id"],
  itemStatus: ItemStatus["type"],
  buyStatus: BuyStatus["type"]
): ItemList {
  return {
    _tag: "ItemList",
    item,
    categoryId,
    itemStatus,
    buyStatus,
  };
}
