import {
  collection,
  getFirestore,
  getDocs,
  // setDoc,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Category } from "./category.model";
import { ItemList } from "./item-list.model";
import { Item } from "./item.model";

let itemRepository: Record<Item["id"], Array<ItemList>> = {};

function newSaveItem(category_id: Category["id"], item: Item, userId: string) {
  setDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    category_id: category_id,
    name: item.name,
    price: item.price,
    itemStatus: "",
    buyStatus: "",
  });
}
function saveItem(category_id: Category["id"], item: Item, userId: string) {
  updateDoc(doc(getFirestore(), "users/", userId, "items", item.id), {
    name: item.name,
    price: item.price,
  });
}

// function saveItem(){

// }
async function findItem(item: Item, userId: string) {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "items", item.id)
  );
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    return doc;
  });
}
async function getItem(userId: string) {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "items")
  );

  querySnapshot.forEach((doc) => {
    // let itemlist:ItemList ={
    //   _tag:'ItemList',
    //   itemId:doc.id,
    //   category_id:doc.data().category_id,
    //   itemStatus:doc.data().i
    // }
    // itemRepository[item.id].push(item)
    itemRepository[doc.id] = doc.data();
    //リポジトリでの型定義の考え方
    //・storeはfirestoreと同じ構成
    //・リポジトリの型は、集約モデル(item-list)を考えていた。合わして作る？
    //・tagを無くして一致？
    //読み取りと書きこみを分けて考える
    //書き込みは stateを気にしなくてよいから、firestoreの構成の一致不要
    //リポジトリの都合の集約の
  });
  return itemRepository;
}
async function deleteItem(userId: string, itemId: string) {
  await deleteDoc(doc(getFirestore(), "users", userId, "items", itemId));
}
// function deleteItem(){

// }

export const ItemRepository = {
  newSaveItem,
  saveItem,
  findItem,
  getItem,
  itemRepository,
  deleteItem,
};
