import {
  collection,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { BuyInfoList, BuyInfo } from "./buy-info.model";

function createBuyInfoRep(buyInfo: BuyInfo, uid: string) {
  setDoc(
    doc(getFirestore(), "users/", uid, "items", String(buyInfo.buyInfoId)),
    {
      category_id: String(buyInfo.categoryId),
      name: buyInfo.item.name,
      price: buyInfo.item.price,
      itemNum: buyInfo.itemNum,
      buyRequest: buyInfo.buyRequest,
      buyResult: buyInfo.buyResult,
      buyDay: buyInfo.buyDay,
    }
  );
}

function updateItemListRep(data: BuyInfoList, uid: string) {
  data.forEach((val: BuyInfo) => {
    setDoc(doc(getFirestore(), "users/", uid, "items", String(val.buyInfoId)), {
      category_id: String(val.categoryId),
      name: val.item.name,
      price: val.item.price,
      itemNum: val.itemNum,
      buyRequest: val.buyRequest,
      buyResult: val.buyResult,
      buyDay: val.buyDay,
    });
  });
}
function updateItemNameRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    name: buyInfo.item.name,
  });
}

function updateItemPriceRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    price: buyInfo.item.price,
  });
}

function updateItemNumRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    itemNum: buyInfo.itemNum,
  });
}

//品目ステータスの変更
function updatebuyRequestRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    buyRequest: buyInfo.buyRequest,
  });
}
//買い物ステータスの変更
function updateBuyResultRep(buyInfo: BuyInfo, uid: string) {
  console.log(buyInfo);
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    buyResult: buyInfo.buyResult,
  });
}

async function fetchItemListRep(uid: string) {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", uid, "items")
  );
  let itemRepository: BuyInfoList = [];
  querySnapshot.forEach((doc) => {
    itemRepository.push({
      _tag: "BuyInfo",
      buyInfoId: doc.id,
      item: {
        _tag: "Item",
        name: doc.data().name,
        price: doc.data().price,
      },

      itemNum: doc.data().itemNum,
      categoryId: doc.data().category_id,
      buyRequest: doc.data().buyRequest,
      buyResult: doc.data().buyResult,
      buyDay: doc.data().buyDay,
    });
  });
  return itemRepository;
}

function deleteItemRep(uid: string, buyInfoId: string) {
  deleteDoc(doc(getFirestore(), "users", uid, "items", String(buyInfoId)));
}

export const BuyInfoRepository = {
  createBuyInfoRep,
  updateItemListRep,
  fetchItemListRep,
  deleteItemRep,
  updatebuyRequestRep,
  updateItemNameRep,
  updateItemPriceRep,
  updateBuyResultRep,
  updateItemNumRep,
};
