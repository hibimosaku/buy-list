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
    doc(getFirestore(), "users", uid, "items", String(buyInfo.buyInfoId)),
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

//購入数の変更
async function updateBuyRequestNumRep(buyInfo: BuyInfo, uid: string) {
  console.log(buyInfo.buyInfoId)
  return updateDoc(doc(getFirestore(), "users", uid, "items", buyInfo.buyInfoId), {
    buyRequestNum: buyInfo.buyRequestNum.num,
  })
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
  //【課題→解決】まとめて更新と以下の部分更新どちらがよい？ケースによる。利用者少数。件数30件。データサイズ。負荷試験のレスポンス。
  await updateDoc(
    doc(getFirestore(), "users", uid, "items", targetBuyInfo.buyInfoId),
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
  //【課題→解決】firestoreのリファレンスどおりだが、なぜエラー時は戻り値あるか不明？
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
//リクエストリセット
function updateResetBuyRequestRep(data:BuyInfoList,uid:string){
  return data.forEach((v:BuyInfo,k:number)=>{
    if(v.buyRequest===false){
      updateDoc(doc(getFirestore(),"users",uid,"items",v.buyInfoId),{
        buyRequest: false,
      })
    }
  })
}


//買物リセット
function updateResetBuyResultRep(data:BuyInfoList,uid:string){
  return data.forEach((v:BuyInfo,k:number)=>{
    if(v.buyResult===false || v.buyResult===true){
      updateDoc(doc(getFirestore(),"users",uid,"items",v.buyInfoId),{
        buyResult: null,
      })
    }
  })
}

//買物完了
function updateBuyfinRep(data: BuyInfoList, uid: string,day:BuyInfo['buyResultDay']) {
  return data.forEach((v: BuyInfo, k: number) => {
    if(v.buyResult===true){
      setDoc(doc(getFirestore(), "users", uid, "items", String(v.buyInfoId)), {
        category_id: String(v.categoryId),
        name: v.item.name,
        price: v.item.price,
        buyRequestNum: v.buyRequestNum.num,
        buyRequest: false,
        buyResult: null,
        buyResultDay: day,
        sort: k,
      });  
    }else{
      return
    }
  });
}


//全データの更新
function updateItemListRep(data: BuyInfoList, uid: string) {
  return data.forEach((v: BuyInfo, k: number) => {
    if(v.buyResult===true){
      setDoc(doc(getFirestore(), "users", uid, "items", String(v.buyInfoId)), {
        category_id: String(v.categoryId),
        name: v.item.name,
        price: v.item.price,
        buyRequestNum: v.buyRequestNum.num,
        buyRequest: v.buyRequest,
        buyResult: v.buyResult,
        buyResultDay: v.buyResultDay,
        sort: k,
      });  
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
  updateBuyRequestNumRep,
  sortUpItemRep,
  sortDownItemRep,
  updateBuyfinRep,
  updateResetBuyRequestRep,
  updateResetBuyResultRep
};
