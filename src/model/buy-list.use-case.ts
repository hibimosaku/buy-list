//買い物リストのユースケース

import { SingleItemList } from "./item-list.model";
import { ItemListRepository } from "./item-list.repository";
import { createItemStatus } from "./item-status.value";
import { changeItem } from "./item.model";

//itemStatusの切り替え
function changeItemStatusUc(data: {
  val: SingleItemList;
  status: boolean;
  index: number;
  userId: string;
}) {
  const item = changeItem(
    data.val.item.id,
    data.val.item.name,
    data.val.item.price
  );
  const itemStatus = createItemStatus(data.status);
  ItemListRepository.updateItemStatus(item, itemStatus, data.userId);
}

export const BuyList = {
  changeItemStatusUc,
};
