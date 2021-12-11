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
    await BuyInfoRepository.createBuyInfoRep(buyInfo, uid, sort);
    return buyInfo;
  } catch (e) {
    store.commit("isErrorDbItem");
    console.error(`errMethod:createItemUi,${e}`);
    throw new Error();
  }
}

async function changeItemNameUc(buyInfo: BuyInfo, name: string, uid: string) {
  try {
    const changeBuyInfo = BuyInfo.changeItemNameUc(buyInfo, name);
    await BuyInfoRepository.updateItemNameRep(changeBuyInfo, uid);
  } catch (e) {
    store.commit("isErrorDbItem");
    console.log(`errmethod:changeItemNam,${e}`);
  }
}

async function changeItemPriceUc(buyInfo: BuyInfo, price: number, uid: string) {
  try {
    const changeBuyInfo = await BuyInfo.changeItemPrice(buyInfo, price); //await。
    await BuyInfoRepository.updateItemPriceRep(changeBuyInfo, uid); //promiseを返している(そこに成功(resolve)、失敗(reject)ステータス持っている)..thenと同じ処理。awaitつけなけらば、trycatchは利用できない
  } catch (e) {
    store.commit("isErrorDbItem");
    console.error(`errMethod:errorChangeItemPrice,${e},${buyInfo.buyInfoId}`);
    throw new Error();
  }
}

async function deleteItemUc(uid: string, buyInfoId: string) {
  try {
    await BuyInfoRepository.deleteItemRep(uid, buyInfoId);
  } catch (e) {
    store.commit("isErrorDbItem");
    console.error(`errMethod:deleteItem,${e}`);
    throw new Error();
  }
}

function loadItemListUc(uid: string) {
  const result = BuyInfoRepository.fetchItemListRep(uid).then((val) => {
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
    store.commit("isErrorDbItem");
    console.error(`errMethod:sortUpItem,${e}`);
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
  )
    .then((s) => {
    })
    .catch((e) => {
      store.commit("isErrorDbItem");
      console.error(`errMethod:sortUpItem,${e}`);
    });
}

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
