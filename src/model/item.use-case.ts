//品目のユースケース

import { BuyInfoRepository } from "./buy-info.repository";
import { BuyInfo, BuyInfoList } from "./buy-info.model";

//品目
function createItemUc(
  category_id: string,
  name: string,
  price: number,
  uid: string
) {
  const buyInfo = BuyInfo.createBuyInfo(name, price, category_id);
  BuyInfoRepository.createBuyInfoRep(buyInfo, uid);
  return buyInfo;
}

function changeItemNameUc(buyInfo: BuyInfo, name: string, uid: string) {
  const changeBuyInfo = BuyInfo.changeItemNameUc(buyInfo, name);

  //【課題】引数はDBに必要な最小限の情報でよい？必要なのは、uidとitemIdとnameのみ
  //今は、DBに依存しないように、モデル単位（集約情報）で渡している
  BuyInfoRepository.updateItemNameRep(changeBuyInfo, uid);
  return;
}

function changeItemPriceUc(buyInfo: BuyInfo, price: number, uid: string) {
  const changeBuyInfo = BuyInfo.changeItemPriceUc(buyInfo, price);

  BuyInfoRepository.updateItemPriceRep(changeBuyInfo, uid);
  return;
}

function deleteItemUc(uid: string, buyInfoId: string) {
  //【課題】モデルにメソッドなし。storeとDB削除のみの作業のため→問題なし
  BuyInfoRepository.deleteItemRep(uid, buyInfoId);
}

function loadItemListUc(uid: string) {
  let result = BuyInfoRepository.fetchItemListRep(uid).then((val) => {
    return val;
  });
  return result;
}

function updateItemList(list: BuyInfoList, uid: string) {
  BuyInfoRepository.updateItemListRep(list, uid);
}

export const itemUc = {
  loadItemListUc,
  createItemUc,
  deleteItemUc,
  changeItemNameUc,
  changeItemPriceUc,
  updateItemList,
};
