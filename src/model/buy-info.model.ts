//集約 DBと一致×。order,注文、操作、dataベース都合でつけない。

import { BuyResult, createBuyResult } from "./buy-result.value";
import { Category } from "./category.model";
import { BuyRequest, createBuyRequest } from "./buy-request.value";
import { Item } from "./item.model";
import { createID, ID } from "./id.value";

//itemWith
export interface BuyInfo {
  readonly _tag: "BuyInfo";
  buyInfoId: ID["raw"];
  item: Item;
  itemNum: number | null;
  categoryId: Category["id"];
  // 在庫
  buyRequest: BuyRequest["type"] | null; //
  buyResult: BuyResult["type"] | null;
  buyDay: string | null;
}

export type BuyInfoList = Array<BuyInfo>;

const MINNUM = 0;
const MINMAX = 9;

//【課題】以下関数のreturnはBuyInfoにしている。
//DB、Storeで使う形に合わせると、return絞れるが、依存はよくないですよね？→ドメインの都合でOK
function createBuyInfo(
  name: string,
  price: number,
  categoryId: Category["id"]
): BuyInfo {
  const item = Item.createItem(name, price);
  const id = createID();
  return {
    _tag: "BuyInfo",
    buyInfoId: id,
    item,
    itemNum: 1,
    categoryId,
    buyRequest: null,
    buyResult: null,
    buyDay: null,
  };
}

function changeItemNameUc(buyInfo: BuyInfo, name: string): BuyInfo {
  const item = Item.changeItemName(buyInfo.item, name);
  return {
    ...buyInfo,
    item,
  };
}

function changeItemPriceUc(buyInfo: BuyInfo, price: number): BuyInfo {
  const item = Item.changeItemPrice(buyInfo.item, price);
  return {
    ...buyInfo,
    item,
  };
}

function createBuyInfoList(list: BuyInfoList): BuyInfoList {
  return list;
}

function changeBuyRequest(buyInfo: BuyInfo, request: boolean): BuyInfo {
  const buyRequest = createBuyRequest(request);

  return {
    ...buyInfo,
    buyRequest: buyRequest.type,
  };
}

function changeItemNum(buyInfo: BuyInfo, num: number): BuyInfo {
  if (num < MINNUM || num > MINMAX)
    throw new Error(`num should be ${MINNUM} to ${MINMAX}`);
  return {
    ...buyInfo,
    itemNum: num,
  };
}

function changeBuyResult(buyInfo: BuyInfo, result: boolean): BuyInfo | null {
  if (buyInfo.buyDay) {
    const buyResult = createBuyResult(result, buyInfo.buyDay);
    return {
      ...buyInfo,
      buyResult: buyResult.type,
    };
  } else {
    const buyResult = createBuyResult(result, null);
    return {
      ...buyInfo,
      buyResult: buyResult.type,
    };
  }
  return null;
}

function changeBuyFin(buyInfo: BuyInfo): BuyInfo {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const buyDay = String(year) + String(month) + String(day);

  if (buyInfo.buyResult == true) {
    return {
      ...buyInfo,
      buyRequest: null,
      buyResult: null,
      buyDay: buyDay,
    };
  } else {
    return buyInfo;
  }

  // let changeBuyInfoList:BuyInfoList=buyInfoList.map((v)=>{
  //   if(v.buyResult == true && v.buyInfoId === v.buyInfoId){
  //     return {
  //       ...v,
  //       buyRequest:null,
  //       buyResult:null,
  //       buyDay:buyDay
  //     }
  //   }else{
  //     return v
  //   }
}

//無効化
function purifyitemList(list: BuyInfoList): BuyInfoList {
  let result: BuyInfoList = [];
  list.forEach((val) => {
    result.push({
      _tag: "BuyInfo",
      buyInfoId: val.buyInfoId,
      item: val.item,
      itemNum: val.itemNum,
      categoryId: val.categoryId,
      buyRequest: val.buyRequest,
      buyResult: val.buyResult,
      buyDay: val.buyDay,
    });
  });
  return result;
}

export const BuyInfo = {
  createBuyInfo,
  changeItemNameUc,
  changeItemPriceUc,
  changeBuyRequest,
  changeBuyResult,
  changeItemNum,
  purifyitemList,
  changeBuyFin,
  createBuyInfoList,
};
