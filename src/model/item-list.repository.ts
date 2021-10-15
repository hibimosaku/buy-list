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
import { ItemList } from "./item-list.model";
// import { ItemList } from "./item-list.model";
import { Item } from "./item.model";

// let itemRepository: ItemList = [];

function createItem(category_id: Category["id"], item: Item, userId: string) {
  setDoc(doc(getFirestore(), "users/", userId, "items", String(item.id)), {
    category_id: String(category_id),
    name: item.name,
    price: item.price,
    itemStatus: "no",
    buyStatus: false,
  });
}
function updateItem(category_id: Category["id"], item: Item, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    name: item.name,
    price: item.price,
  });
  // return getItemList(userId)
}

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
    });
  });
  return itemRepository;
}

async function deleteItem(userId: string, itemId: string) {
  await deleteDoc(
    doc(getFirestore(), "users", userId, "items", String(itemId))
  );
}
// function deleteItem(){

// }

export const ItemListRepository = {
  createItem,
  updateItem,
  getItemList,
  deleteItem,
};
