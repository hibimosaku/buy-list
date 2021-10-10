//entity

import { changeItem, createItem } from "./item.model";
import { ItemRepository } from "./item.repository";

//品目登録(新規登録、更新)update
export function saveItemUc(
  category_id: string,
  name: string,
  price: number,
  id?: string
): any {
  //idなければ、新規登録、idあれば更新
  if (!id) {
    const item = createItem(name, price);
    ItemRepository.newSaveItem(category_id, item, "userID"); //userIdは今後見直し
    const allItem = ItemRepository.getItem("userID");
    return allItem;
  }
  if (id) {
    const item = changeItem(id, name, price);
    ItemRepository.saveItem(id, item, "userID");
    const allItem = ItemRepository.getItem("userID");
    return allItem;
  }
}

//初期データ
export function startItem() {
  return ItemRepository.getItem("userID");
  // .then((value) => {
  //   console.log("UC_itemから",value)
  //   return value
  // });
}
