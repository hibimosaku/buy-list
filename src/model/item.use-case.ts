//品目のユースケース

import { BuyInfoRepository } from "./buy-info.repository";
import { BuyInfo } from "./buy-info.model";
import { store } from "../store/store";

//品目
async function createItemUc(
  category_id: string,
  name: string,
  price: number,
  uid: string,
  sort: number
): Promise<BuyInfo | void> {
  try {
    const buyInfo = BuyInfo.createBuyInfo(name, price, category_id);
    BuyInfoRepository.createBuyInfoRep(buyInfo, uid, sort);
    return buyInfo;
  } catch (e) {
    store.commit("errorCreateItem");
  }
}

async function changeItemNameUc(buyInfo: BuyInfo, name: string, uid: string) {
  try {
    const changeBuyInfo = BuyInfo.changeItemNameUc(buyInfo, name);
    console.log("2");
    BuyInfoRepository.updateItemNameRep(changeBuyInfo, uid);
    console.log("3");
  } catch (e) {
    console.log("4", e);
    store.commit("errorCreateItem");
    throw new Error();
  }
}

async function changeItemPriceUc(buyInfo: BuyInfo, price: number, uid: string) {
  try {
    const changeBuyInfo = await BuyInfo.changeItemPrice(buyInfo, price); //await。
    await BuyInfoRepository.updateItemPriceRep(changeBuyInfo, uid); //promiseを返している(そこに成功(resolve)、失敗(reject)ステータス持っている)..thenと同じ処理。awaitつけなけらば、trycatchは利用できない
  } catch (e) {
    store.commit("errorChangeItemPrice"); //【課題】これを値ごとに管理するなら？modelにエラー追加が楽だが。。。
    console.error(`errMethod:errorChangeItemPrice,${e},${buyInfo.buyInfoId}`);
    throw new Error();
  }
}

function deleteItemUc(uid: string, buyInfoId: string) {
  BuyInfoRepository.deleteItemRep(uid, buyInfoId);
}

function loadItemListUc(uid: string) {
  let result = BuyInfoRepository.fetchItemListRep(uid).then((val) => {
    return val;
  });
  return result;
}

async function sortUpItemUc(
  targetIndex: number,
  prevIndex: number | null,
  targetBuyInfo: BuyInfo,
  prevBuyInfo: BuyInfo,
  uid: string
) {
  await BuyInfoRepository.sortUpItemRep(
    targetIndex,
    prevIndex,
    targetBuyInfo,
    prevBuyInfo,
    uid
  ).catch((e) => {
    throw new Error(`sortUpItem is failure,${e}`);
  });
}

async function sortDownItemUc(
  targetIndex: number,
  nextIndex: number | null,
  targetBuyInfo: BuyInfo,
  nextBuyInfo: BuyInfo,
  uid: string
) {
  await BuyInfoRepository.sortDownItemRep(
    targetIndex,
    nextIndex,
    targetBuyInfo,
    nextBuyInfo,
    uid
  ).catch((e) => {
    throw new Error(`sortDownItem is failure,${e}`);
  });
}

// function updateItemList(list: BuyInfoList, uid: string) {
//   BuyInfoRepository.updateItemListRep(list, uid);
// }

export const ItemUc = {
  loadItemListUc,
  createItemUc,
  deleteItemUc,
  changeItemNameUc,
  changeItemPriceUc,
  sortUpItemUc,
  sortDownItemUc,
  // updateItemList,
};
