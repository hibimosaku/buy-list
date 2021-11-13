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

function createBuyInfoRep(buyInfo: BuyInfo, uid: string,sort:number) {
  console.log('i3',buyInfo.buyRequestNum.num)
  setDoc(
    doc(getFirestore(), "users/", uid, "items", String(buyInfo.buyInfoId)),
    {
      category_id: String(buyInfo.categoryId),
      name: buyInfo.item.name,
      price: buyInfo.item.price,
      buyRequestNum: buyInfo.buyRequestNum.num,
      buyRequestDo: buyInfo.buyRequestDo,
      buyResultDo: buyInfo.buyResultDo,
      buyResultDay: buyInfo.buyResultDay,
      sort
    }
  );
}

function updateItemListRep(data: BuyInfoList, uid: string) {
  console.log('list',data)
  data.forEach((val: BuyInfo,index:number) => {
    setDoc(doc(getFirestore(), "users/", uid, "items", String(val.buyInfoId)), {
      category_id: String(val.categoryId),
      name: val.item.name,
      price: val.item.price,
      buyRequestNum: val.buyRequestNum.num,
      buyRequestDo: val.buyRequestDo,
      buyResultDo: val.buyResultDo,
      buyResultDay: val.buyResultDay,
      sort:index
    });
  });
}
async function updateItemNameRep(buyInfo: BuyInfo, uid: string) {
  await updateDoc(doc(getFirestore(), "users/", 'aaa', "items", buyInfo.buyInfoId), {
    name: buyInfo.item.name,
  }).then(()=>{
    console.log('p16')
    return })
  .catch((e)=>{
    console.log('p17',e)
    throw new Error})
}

async function updateItemPriceRep(buyInfo: BuyInfo, uid: string) {
  // throw new Error('aaa')
  await updateDoc(doc(getFirestore(), "users/", 'aaa', "items", buyInfo.buyInfoId), {
    price: buyInfo.item.price,
  }).catch((error)=>{
    console.log('p7')
    throw new Error(error)
  })
}

function updateItemNumRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    buyRequestNum: buyInfo.buyRequestNum.num,
  });
}

//買物リクエストのするしないの変更
function updatebuyRequestDoRep(buyInfo: BuyInfo, uid: string) {
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    buyRequestDo: buyInfo.buyRequestDo,
  });
}

//買い物結果の変更
function updateBuyResultDoRep(buyInfo: BuyInfo, uid: string) {
  console.log(buyInfo);
  updateDoc(doc(getFirestore(), "users/", uid, "items", buyInfo.buyInfoId), {
    buyResultDo: buyInfo.buyResultDo,
  });
}

async function fetchItemListRep(uid: string) {
  const querySnapshot = await getDocs(
    query(collection(getFirestore(), "users", uid, "items"),orderBy("sort"))
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
      buyRequestNum: {
        _tag:'BuyRequestNum',
        num:doc.data().buyRequestNum,
      },
      categoryId: doc.data().category_id,
      buyRequestDo: doc.data().buyRequestDo,
      buyResultDo: doc.data().buyResultDo,
      buyResultDay: doc.data().buyResultDay,
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
  updatebuyRequestDoRep,
  updateItemNameRep,
  updateItemPriceRep,
  updateBuyResultDoRep,
  updateItemNumRep,
};
