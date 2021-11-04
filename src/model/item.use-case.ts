//品目のユースケース

import { Item } from "./item.model";
import { BuyInfoRepository } from "./buy-info.repository";
import { BuyInfoList } from "./buy-info.model";

//品目
function createItemUc(
  category_id: string,
  name: string,
  price: number,
  userId: string
) {
  const item = Item.createItem(name, price);
  BuyInfoRepository.createBuyInfo(category_id, item, userId);
  return item;
}

function updateItemNameUc(item: Item, name: string, uid: string) {
  const createItem = Item.changeItemName(item, name);
  BuyInfoRepository.updateItemName(createItem, uid);
  return item;
}

function updateItemPriceUc(item: Item, price: number, uid: string) {
  const createItem = Item.changeItemPrice(item, price);
  BuyInfoRepository.updateItemPrice(createItem, uid);
  return item;
}

function deleteItemUc(userId: string, itemId: string) {
  BuyInfoRepository.deleteItem(userId, itemId);
}

function loadItemListUc(userId: string) {
  let result = BuyInfoRepository.fetchItemList(userId).then((val) => {
    return val;
  });
  return result;
}

function updateItemList(list: BuyInfoList, uid: string) {
  BuyInfoRepository.updateItemList(list, uid);
}

export const ItemListUc = {
  loadItemListUc,
  createItemUc,
  deleteItemUc,
  updateItemNameUc,
  updateItemPriceUc,
  updateItemList,
};
