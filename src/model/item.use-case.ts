//品目のユースケース

import { BuyInfoRepository } from "./buy-info.repository";
import { BuyInfo } from "./buy-info.model";
import { store } from "../store/store";

//品目
async function createItemUc(
  category_id: string,
  name: string,
  price: number,
  uid: string,
  sort:number
) :Promise<BuyInfo | void>{
  try{
    const buyInfo = BuyInfo.createBuyInfo(name, price, category_id);
    console.log('i2')
    BuyInfoRepository.createBuyInfoRep(buyInfo, uid,sort);
    return buyInfo;  
  }catch(e){
    store.commit('errorCreateItem')
  }
}

async function changeItemNameUc(buyInfo: BuyInfo, name: string, uid: string) {
  try{
    const changeBuyInfo = BuyInfo.changeItemNameUc(buyInfo, name);
    console.log('2')
    BuyInfoRepository.updateItemNameRep(changeBuyInfo, uid)
    console.log('3')

  }catch(e){
    console.log('4',e)
    store.commit('errorCreateItem')
  }
}

async function changeItemPriceUc(buyInfo: BuyInfo, price: number, uid: string) {
  // try{
    const changeBuyInfo = await BuyInfo.changeItemPriceUc(buyInfo, price);
    console.log('p6')
    await BuyInfoRepository.updateItemPriceRep(changeBuyInfo, uid)
    .then(()=>{
      console.log('p13')
      return
    })
    .catch(()=>{
      console.log('p12')
      store.commit('errorChangeItemPrice')

      throw new Error
    })
  // }catch(e){
  //   console.log('p8',e)
  //   store.commit('errorChangeItemPrice')
  //   throw new Error
  // }

}

function deleteItemUc(uid: string, buyInfoId: string) {
  BuyInfoRepository.deleteItemRep(uid, buyInfoId);
}

function loadItemListUc(uid: string) {
  let result = BuyInfoRepository.fetchItemListRep(uid).then((val) => {
    return val;
  });
  return result;
}

// function updateItemList(list: BuyInfoList, uid: string) {
//   BuyInfoRepository.updateItemListRep(list, uid);
// }

export const itemUc = {
  loadItemListUc,
  createItemUc,
  deleteItemUc,
  changeItemNameUc,
  changeItemPriceUc,
  // updateItemList,
};
