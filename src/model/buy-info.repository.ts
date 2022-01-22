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
import { fetchID, ID } from "./id.value";

async function createBuyInfoRep(buyInfo: BuyInfo, uid: string, sort: number) {
  return setDoc(
    doc(getFirestore(), "users", uid, "items", String(buyInfo.buyInfoId.raw)),
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

async function updateItemNameRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId.raw),
    {
      name: buyInfo.item.name,
    }
  );
}

async function updateItemPriceRep(
  buyInfo: BuyInfo,
  uid: string
): Promise<void> {
  return updateDoc(
    //return を返さないとpromiseを返さない
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId.raw),
    {
      price: buyInfo.item.price,
    }
  );
}

//購入数の変更
async function updateBuyRequestNumRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId.raw),
    {
      buyRequestNum: buyInfo.buyRequestNum.num,
    }
  );
}

async function deleteItemRep(uid: string, buyInfoId: ID) {
  return deleteDoc(
    doc(getFirestore(), "users", uid, "items", String(buyInfoId.raw))
  );
}

async function sortUpItemRep(
  targetIndex: number,
  prevIndex: number | null,
  targetBuyInfo: BuyInfo,
  prevBuyInfo: BuyInfo,
  uid: string
): Promise<void> {
  //【課題→解決】まとめて更新と以下の部分更新どちらがよい？ケースによる。利用者少数。件数30件。データサイズ。負荷試験のレスポンス。
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", targetBuyInfo.buyInfoId.raw),
    {
      sort: prevIndex,
    }
  );
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", prevBuyInfo.buyInfoId.raw),
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
  //【課題→解決】firestoreのリファレンスどおりだが、なぜエラー時は戻り値あるか不明？
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", targetBuyInfo.buyInfoId.raw),
    {
      sort: nextIndex,
    }
  );
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", nextBuyInfo.buyInfoId.raw),
    {
      sort: targetIndex,
    }
  );
}

//買物リクエストのするしないの変更
function updateBuyRequestRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId.raw),
    {
      buyRequest: buyInfo.buyRequest,
    }
  );
}

//買い物結果の変更
function updateBuyResultRep(buyInfo: BuyInfo, uid: string) {
  return updateDoc(
    doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId.raw),
    {
      buyResult: buyInfo.buyResult,
    }
  );
}
//リクエストリセット
function updateResetBuyRequestRep(data: BuyInfoList, uid: string) {
  return data.forEach((v: BuyInfo, k: number) => {
    if (v.buyRequest === false) {
      updateDoc(doc(getFirestore(), "users", uid, "items", v.buyInfoId.raw), {
        buyRequest: false,
      });
    }
  });
}

//買物リセット
function updateResetBuyResultRep(data: BuyInfoList, uid: string) {
  return data.forEach((v: BuyInfo, k: number) => {
    if (v.buyResult === false || v.buyResult === true) {
      updateDoc(doc(getFirestore(), "users", uid, "items", v.buyInfoId.raw), {
        buyResult: null,
      });
    }
  });
}

//買物完了
function updateBuyfinRep(
  data: BuyInfoList,
  uid: string,
  day: BuyInfo["buyResultDay"]
) {
  return data.forEach((v: BuyInfo, k: number) => {
    if (v.buyResult === true) {
      setDoc(
        doc(getFirestore(), "users", uid, "items", String(v.buyInfoId.raw)),
        {
          category_id: String(v.categoryId),
          name: v.item.name,
          price: v.item.price,
          buyRequestNum: v.buyRequestNum.num,
          buyRequest: false,
          buyResult: null,
          buyResultDay: day,
          sort: k,
        }
      );
    } else {
      return;
    }
  });
}

//全データの更新
function updateItemListRep(data: BuyInfoList, uid: string) {
  return data.forEach((v: BuyInfo, k: number) => {
    if (v.buyResult === true) {
      setDoc(
        doc(getFirestore(), "users", uid, "items", String(v.buyInfoId.raw)),
        {
          category_id: String(v.categoryId),
          name: v.item.name,
          price: v.item.price,
          buyRequestNum: v.buyRequestNum.num,
          buyRequest: v.buyRequest,
          buyResult: v.buyResult,
          buyResultDay: v.buyResultDay,
          sort: k,
        }
      );
    }
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
      buyInfoId: fetchID(doc.id),
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
  updateBuyRequestNumRep,
  sortUpItemRep,
  sortDownItemRep,
  updateBuyfinRep,
  updateResetBuyRequestRep,
  updateResetBuyResultRep,
};
