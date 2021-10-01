import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Item } from "./item.model";

// export interface ItemRepository{
//   item:Array<Item>
// }

let itemRepository:Record<Item['id'],Array<Item>>={}

function newSaveItem(item:Item,userId:string) {
  setDoc(doc(getFirestore(), "users/",userId,"items",item.id), {
    name: item.name,
    price: item.price,
  });
}

// function saveItem(){

// }
async function findItem(item:Item,userId:string){
  const querySnapshot = await getDocs(collection(getFirestore(),"users",userId,"items",item.id))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    return doc
  });
}
async function getItem(userId:string){
  // const querySnapshot = await getDoc(doc(getFirestore(),"users",userId,"items","202110155412"))
  // if(querySnapshot.exists()){
  //   console.log(querySnapshot.data())

  // }else{{
  //   console.log('失敗')
  // }}
  const querySnapshot = await getDocs(collection(getFirestore(),"users",userId,"items"))
  
    querySnapshot.forEach((doc) => {
      let item:Item ={
        _tag:'Item',
        id:doc.id,
        name:doc.data().name,
        price:doc.data().price
      }
      // console.log(itemRepository)
      // itemRepository[item.id].push(item)
      itemRepository[item.id]=item

    });
    return itemRepository
}

// function deleteItem(){

// }

export const ItemRepository = {
  newSaveItem,
  findItem,
  getItem,
  itemRepository
};
