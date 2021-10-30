//品目のユースケース

import { changeItem, createItem } from "./item.model";
import { ItemListRepository } from "./item-list.repository";
import { SingleItemList } from "./item-list.model";

//品目
function createItemUc(
  category_id: string,
  name: string,
  price: number,
  userId: string
) {
  const item = createItem(name, price);
  ItemListRepository.createItem(category_id, item, userId);
  return item;
}

function updateItemUc(val: SingleItemList, uid: string) {
  const item = changeItem(val.item.id, val.item.name, val.item.price);
  ItemListRepository.updateItem(item, uid);
  return item;
}

function updateItemNameUc(val: SingleItemList, uid: string) {
  const item = changeItem(val.item.id, val.item.name, val.item.price);
  ItemListRepository.updateItemName(item, uid);
  return item;
}

function updateItemPriceUc(val: SingleItemList, uid: string) {
  const item = changeItem(val.item.id, val.item.name, val.item.price);
  ItemListRepository.updateItemPrice(item, uid);
  return item;
}

function deleteItemUc(userId: string, itemId: string) {
  ItemListRepository.deleteItem(userId, itemId);
}

function loadItemListUc(userId: string) {
  let result = ItemListRepository.fetchItemList(userId).then((val) => {
    return val;
  });
  return result;
}

export const ItemListUc = {
  loadItemListUc,
  createItemUc,
  updateItemUc,
  deleteItemUc,
  updateItemNameUc,
  updateItemPriceUc,
};