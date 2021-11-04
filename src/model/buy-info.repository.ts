import {
  collection,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Category } from "./category.model";
import { BuyInfoList, BuyInfo } from "./buy-info.model";
import { BuyRequest } from "./buy-request.value";
import { Item } from "./item.model";

function createBuyInfo(
  category_id: Category["id"],
  item: Item,
  userId: string
) {
  setDoc(doc(getFirestore(), "users/", userId, "items", String(item.id)), {
    category_id: String(category_id),
    name: item.name,
    price: item.price,
    itemNum: 1,
    buyRequest: null,
    buyResult: null,
    buyDay: null,
  });
}

async function updateItemList(data: BuyInfoList, userId: string) {
  data.forEach((val: BuyInfo) => {
    setDoc(doc(getFirestore(), "users/", userId, "items", val.item.id), {
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
function updateItemName(item: Item, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    name: item.name,
  });
}

function updateItemPrice(item: Item, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    price: item.price,
  });
}

function updateItemNum(itemNum: number, list: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", list.item.id), {
    itemNum,
  });
}

//品目ステータスの変更
function updatebuyRequest(itemId: string, status: BuyRequest, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", itemId), {
    buyRequest: status.type,
  });
}
//買い物ステータスの変更
function updateBuyStatus(status: boolean, data: BuyInfo, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", data.item.id), {
    buyResult: status,
  });
}

async function fetchItemList(userId: string) {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "items")
  );
  let itemRepository: BuyInfoList = [];
  querySnapshot.forEach((doc) => {
    itemRepository.push({
      _tag: "BuyInfo",
      item: {
        _tag: "Item",
        id: doc.id,
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

function deleteItem(userId: string, itemId: string) {
  deleteDoc(doc(getFirestore(), "users", userId, "items", String(itemId)));
}

export const BuyInfoRepository = {
  createBuyInfo,
  updateItemList,
  fetchItemList,
  deleteItem,
  updatebuyRequest,
  updateItemName,
  updateItemPrice,
  updateBuyStatus,
  updateItemNum,
};
