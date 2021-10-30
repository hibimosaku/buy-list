//買い物リクエストのユースケース

import { ItemList } from "./item-list.model";
import { ItemListRepository } from "./item-list.repository";

function changeBuyStatusUc(data: ItemList, userId: string) {
  ItemListRepository.updateItemList(data, userId);
}

export const RequestList = {
  // changeItemStatusUc,
  changeBuyStatusUc,
};
