//買い物リストのユースケース

import { SingleItemList } from "./item-list.model";
import { ItemListRepository } from "./item-list.repository";
import { createItemStatus } from "./item-status.value";
import { changeItem } from "./item.model";

//itemStatusの切り替え
function changeItemStatusUc(
  val: SingleItemList,
  status: boolean,
  userId: string
) {
  const item = changeItem(val.item.id, val.item.name, val.item.price);
  const itemStatus = createItemStatus(status);
  ItemListRepository.updateItemStatus(item, itemStatus, userId);
}

function changeItemNumUc(itemNum: number, list: SingleItemList, uid: string) {
  ItemListRepository.updateItemNum(itemNum, list, uid);
}

export const BuyList = {
  changeItemStatusUc,
  changeItemNumUc,
};
