//集約 DBと一致×。order,注文、操作、dataベース都合でつけない。

import { Category } from "./category.model";
import { Item } from "./item.model";
import { createID, ID } from "./id.value";
import { BuyRequestNum, createBuyRequestNum } from "./buy-request-num.value";

//itemWith
export interface BuyInfo {
  readonly _tag: "BuyInfo";
  buyInfoId: ID["raw"];
  item: Item;
  categoryId: Category["id"];
  buyRequest: boolean;
  buyRequestNum: BuyRequestNum;
  buyResult: boolean | null;
  buyResultDay: string | null;
}

export type BuyInfoList = Array<BuyInfo>;

//【課題→解決】以下関数のreturnはBuyInfoにしている。
//DB、Storeで使う形に合わせると、return絞れるが、依存はよくないですよね？→ドメインの都合でOK
function createBuyInfo(
  name: string,
  price: number,
  categoryId: Category["id"]
): BuyInfo {
  const item = Item.createItem(name, price);
  const id = createID();
  const num = createBuyRequestNum();
  return {
    _tag: "BuyInfo",
    buyInfoId: id,
    item,
    categoryId,
    buyRequest: false,
    buyRequestNum: num,
    buyResult: null,
    buyResultDay: null,
  };
}

function changeItemNameUc(buyInfo: BuyInfo, name: string): BuyInfo {
  const item = Item.changeItemName(buyInfo.item, name);
  return {
    ...buyInfo,
    item,
  };
}

function changeItemPrice(buyInfo: BuyInfo, price: number): BuyInfo {
  const item = Item.changeItemPrice(buyInfo.item, price);
  return {
    ...buyInfo,
    item,
  };
}

function changeBuyRequestDo(buyInfo: BuyInfo, doRequest: boolean): BuyInfo {
  return {
    ...buyInfo,
    buyRequest: doRequest,
  };
}

function changeBuyRequestNum(buyInfo: BuyInfo, num: number): BuyInfo {
  const requestNum = createBuyRequestNum(num);
  return {
    ...buyInfo,
    buyRequestNum: requestNum,
  };
}

function changeBuyResultDo(
  buyInfo: BuyInfo,
  requestDo: boolean
): BuyInfo | null {
  return {
    ...buyInfo,
    buyResult: requestDo,
  };
}

function buyFin(buyInfo: BuyInfo,day:BuyInfo['buyResultDay']): BuyInfo {
  return {
    ...buyInfo,
    buyRequest: false,
    buyResultDay:day
  };
}

function createBuyResultDay():BuyInfo['buyResultDay']{
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const buyResultDay = String(year) + String(month) + String(day);

  return buyResultDay
}

function RetrieveIndex(
  buyInfoList: BuyInfoList,
  buyInfoId: string
): number | undefined {
  let result;
  result = buyInfoList.findIndex((v, k) => {
    return v.buyInfoId === buyInfoId;
  });
  return result;
}

//無効化
// function purifyitemList(list: BuyInfoList): BuyInfoList {
//   const result: BuyInfoList = [];
//   list.forEach((val) => {
//     result.push({
//       _tag: "BuyInfo",
//       buyInfoId: val.buyInfoId,
//       item: val.item,
//       buyRequestNum: val.buyRequestNum,
//       categoryId: val.categoryId,
//       buyRequest: val.buyRequest,
//       buyResult: val.buyResult,
//       buyResultDay: val.buyResultDay,
//     });
//   });
//   return result;
// }

export const BuyInfo = {
  createBuyInfo,
  changeItemNameUc,
  changeItemPrice,
  changeBuyRequestDo,
  changeBuyRequestNum,
  changeBuyResultDo,
  buyFin,
  RetrieveIndex,
  createBuyResultDay
};
