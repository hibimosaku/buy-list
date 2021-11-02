//集約 DBと一致×。order,注文、操作、dataベース都合でつけない。

import { BuyStatus } from "./buy-status.value";
import { Category } from "./category.model";
import { ItemStatus } from "./item-status.value";
import { Item } from "./item.model";

//itemWith
export interface SingleItemList {
  readonly _tag: "ItemList";
  item: Item;
  // itemNum:number
  categoryId: Category["id"];
  itemStatus: ItemStatus["type"] | null;
  buyStatus: BuyStatus["type"] | null;
  buyDay: string | null;
}

export type ItemList = Array<SingleItemList>;

function createItemList(list: ItemList): ItemList {
  return list;
}

//buyStatus→tureの変更
function changeBuyStatusTrue(data: SingleItemList) {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  data.buyStatus = null;
  data.itemStatus = null;
  data.buyDay = String(year) + String(month) + String(day);
  return data;
}

//無効化
function purifyitemList(list: ItemList): ItemList {
  let result: ItemList = [];
  list.forEach((val, key) => {
    result.push({
      _tag: "ItemList",
      item: val.item,
      categoryId: val.categoryId,
      itemStatus: val.itemStatus,
      buyStatus: val.buyStatus,
      buyDay: val.buyDay,
    });
  });
  return result;
}

//並び替え:品目ステータス
function itemStatusWantOrder(list: ItemList): void {
  list.sort((a, b) => {
    if (a.itemStatus === b.itemStatus) {
      return 1;
    } else if (!a.itemStatus) {
      return 0;
    } else {
      return -1;
    }
  });
}

export const ItemList = {
  purifyitemList,
  changeBuyStatusTrue,
  createItemList,
  itemStatusWantOrder,
};
