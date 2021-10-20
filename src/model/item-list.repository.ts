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
import { ItemList, SingleItemList } from "./item-list.model";
import { ItemStatus } from "./item-status.value";
import { Item } from "./item.model";

function createItem(category_id: Category["id"], item: Item, userId: string) {
  setDoc(doc(getFirestore(), "users/", userId, "items", String(item.id)), {
    category_id: String(category_id),
    name: item.name,
    price: item.price,
    itemStatus: false,
    buyStatus: false,
    buyDay: null,
  });
}

async function updateItemList(data: ItemList, userId: string) {
  data.forEach((val: SingleItemList) => {
    setDoc(doc(getFirestore(), "users/", userId, "items", val.item.id), {
      category_id: String(val.categoryId),
      name: val.item.name,
      price: val.item.price,
      itemStatus: val.itemStatus,
      buyStatus: val.buyStatus,
      buyDay: val.buyDay,
    });
  });
}
function updateItem(category_id: Category["id"], item: Item, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    name: item.name,
    price: item.price,
  });
}
//品目ステータスの変更
function updateItemStatus(item: Item, status: ItemStatus, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    itemStatus: status.type,
  });
}
//買い物ステータスの変更
// function updateBuyStatus(item: Item, status:BuyStatus,userId: string){
//   updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
//     buyStatus: status.type,
//   });
// }

async function getItemList(userId: string) {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "items")
  );
  let itemRepository: ItemList = [];
  querySnapshot.forEach((doc) => {
    itemRepository.push({
      _tag: "ItemList",
      item: {
        _tag: "Item",
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
      },
      categoryId: doc.data().category_id,
      itemStatus: doc.data().itemStatus,
      buyStatus: doc.data().buyStatus,
      buyDay: doc.data().buyDay,
    });
  });
  return itemRepository;
}

function deleteItem(userId: string, itemId: string) {
  deleteDoc(doc(getFirestore(), "users", userId, "items", String(itemId)));
}

export const ItemListRepository = {
  createItem,
  updateItemList,
  updateItem,
  getItemList,
  deleteItem,
  updateItemStatus,
  // updateBuyStatus
};
