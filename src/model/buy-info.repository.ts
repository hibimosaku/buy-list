import {
  collection,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { BuyInfoList, BuyInfo } from "./buy-info.model";

async function createBuyInfoRep(buyInfo: BuyInfo, uid: string, sort: number) {
  return setDoc(
    doc(getFirestore(), "users", "a", "items", String(buyInfo.buyInfoId)),
    {
      category_id: String(buyInfo.categoryId),
      name: buyInfo.item.name,
      price: buyInfo.item.price,
      buyRequestNum: buyInfo.buyRequestNum.num,
      buyRequest: buyInfo.buyRequest,
      buyResult: buyInfo.buyResult,
      buyResultDay: buyInfo.buyResultDay,
      sort,
    }
  );
}

function updateItemNameRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId),
    {
      name: buyInfo.item.name,
    }
  );
}

function updateItemPriceRep(buyInfo: BuyInfo, uid: string): Promise<void> {
  return updateDoc(
    //return を返さないとpromiseを返さない
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId),
    {
      price: buyInfo.item.price,
    }
  );
}

function updateItemNumRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId), {
    buyRequestNum: buyInfo.buyRequestNum.num,
  });
}

function deleteItemRep(uid: string, buyInfoId: string) {
  return deleteDoc(
    doc(getFirestore(), "users", uid, "items", String(buyInfoId))
  );
}

async function sortUpItemRep(
  targetIndex: number,
  prevIndex: number | null,
  targetBuyInfo: BuyInfo,
  prevBuyInfo: BuyInfo,
  uid: string
): Promise<void> {
  //【課題】まとめて更新と以下の部分更新どちらがよい？ケースによる。利用者少数。件数30件。データサイズ。負荷試験のレスポンス。
  await updateDoc(
    doc(getFirestore(), "users", "a", "items", targetBuyInfo.buyInfoId),
    {
      sort: prevIndex,
    }
  );
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", prevBuyInfo.buyInfoId),
    {
      sort: targetIndex,
    }
  );
}

async function sortDownItemRep(
  targetIndex: number,
  nextIndex: number | null,
  targetBuyInfo: BuyInfo,
  nextBuyInfo: BuyInfo,
  uid: string
): Promise<void> {
  //【課題】firestoreのリファレンスどおりだが、なぜエラー時は戻り値あるか不明？
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", targetBuyInfo.buyInfoId),
    {
      sort: nextIndex,
    }
  );
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", nextBuyInfo.buyInfoId),
    {
      sort: targetIndex,
    }
  );
}

//買物リクエストのするしないの変更
function updateBuyRequestRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId),
    {
      buyRequest: buyInfo.buyRequest,
    }
  );
}

//買い物結果の変更
function updateBuyResultRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId),
    {
      buyResult: buyInfo.buyResult,
    }
  );
}

function updateItemListRep(data: BuyInfoList, uid: string) {
  return data.forEach((val: BuyInfo, index: number) => {
    setDoc(doc(getFirestore(), "users", uid, "items", String(val.buyInfoId)), {
      category_id: String(val.categoryId),
      name: val.item.name,
      price: val.item.price,
      buyRequestNum: val.buyRequestNum.num,
      buyRequest: val.buyRequest,
      buyResult: val.buyResult,
      buyResultDay: val.buyResultDay,
      sort: index,
    });
  });
}

async function fetchItemListRep(uid: string) {
  const querySnapshot = await getDocs(
    query(collection(getFirestore(), "users", uid, "items"), orderBy("sort"))
  );
  const itemRepository: BuyInfoList = [];
  querySnapshot.forEach((doc) => {
    itemRepository.push({
      _tag: "BuyInfo",
      buyInfoId: doc.id,
      item: {
        _tag: "Item",
        name: doc.data().name,
        price: doc.data().price,
      },
      buyRequestNum: {
        _tag: "BuyRequestNum",
        num: doc.data().buyRequestNum,
      },
      categoryId: doc.data().category_id,
      buyRequest: doc.data().buyRequest,
      buyResult: doc.data().buyResult,
      buyResultDay: doc.data().buyResultDay,
    });
  });
  return itemRepository;
}

export const BuyInfoRepository = {
  createBuyInfoRep,
  updateItemListRep,
  fetchItemListRep,
  deleteItemRep,
  updateBuyRequestRep,
  updateItemNameRep,
  updateItemPriceRep,
  updateBuyResultRep,
  updateItemNumRep,
  sortUpItemRep,
  sortDownItemRep,
};
