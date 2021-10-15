//entity

import { changeItem, createItem } from "./item.model";
import { ItemListRepository } from "./item-list.repository";

//品目
function createItemUc(
  category_id: string,
  name: string,
  price: number,
  userId: string
) {
  const item = createItem(name, price);
  ItemListRepository.createItem(category_id, item, userId)
  return item
}

function updateItemUc(
  category_id: string,
  name: string,
  price: number,
  itemId: string,
  userId: string
) {
  const item = changeItem(itemId, name, price)
  ItemListRepository.updateItem(itemId, item, userId);
  return item
}

function deleteItemListUc(userId: string, itemId: string){
  ItemListRepository.deleteItem(userId, itemId)
}

function getItemListUc(userId: string) {
  let result = ItemListRepository.getItemList(userId).then((val) => {
    return val;
  });
  return result;
}

export const ItemListUc = {
  getItemListUc,
  createItemUc,
  updateItemUc,
  deleteItemListUc
};
