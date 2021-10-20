//買い物リクエストのユースケース

import { ItemList } from "./item-list.model";
import { ItemListRepository } from "./item-list.repository";

//itemStatusの切り替え
// function changeItemStatusUc (data:any,day:string){
//   const item = changeItem(data.val.item.id, data.val.item.name,data.val.item.price);
//   const buyStatus=createBuyStatus(data.status,day)
//   ItemListRepository.updateBuyStatus(item,buyStatus,data.userId)
// }

function changeBuyStatusUc(data: ItemList, userId: string) {
  ItemListRepository.updateItemList(data, userId);
}

export const RequestList = {
  // changeItemStatusUc,
  changeBuyStatusUc,
};
