//買い物リクエストのユースケース

import { ItemList, SingleItemList } from "./item-list.model";
import { ItemListRepository } from "./item-list.repository";

function finBuyStatusUc(data: ItemList, userId: string) {
  ItemListRepository.updateItemList(data, userId);
}

function changeBuyStatusUc(status: boolean, data: SingleItemList, uid: string) {
  ItemListRepository.updateBuyStatus(status, data, uid);
}

export const RequestList = {
  finBuyStatusUc,
  changeBuyStatusUc,
};
