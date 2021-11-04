//集約 DBと一致×。order,注文、操作、dataベース都合でつけない。

import { BuyResult } from "./buy-result.value";
import { Category } from "./category.model";
import { BuyRequest } from "./buy-request.value";
import { Item } from "./item.model";

//itemWith
export interface BuyInfo {
  readonly _tag: "BuyInfo";
  item: Item;
  itemNum: number | null;
  categoryId: Category["id"];
  buyRequest: BuyRequest["type"] | null;
  buyResult: BuyResult["type"] | null;
  buyDay: string | null;
}

export type BuyInfoList = Array<BuyInfo>;

const NUMMIN = 1;
const NUMMAX = 9;

function createBuyInfo(
  item: Item,
  itemNum: number,
  categoryId: Category["id"],
  buyRequest: BuyRequest["type"],
  buyResult: BuyResult["type"],
  buyDay: string
): BuyInfo {
  if (itemNum < NUMMIN || itemNum < NUMMAX)
    throw new Error(`itemNum should be ${NUMMIN} to ${NUMMAX}`);

  return {
    _tag: "BuyInfo",
    item,
    itemNum,
    categoryId,
    buyRequest,
    buyResult,
    buyDay,
  };
}

function createBuyInfoList(list: BuyInfoList): BuyInfoList {
  return list;
}

//buyStatus→tureの変更【課題】下のようなreturnをidとstatusのみはだめ？DBは、idと変更項目があればupdateできる
function changeBuyStatusTrue(data: BuyInfo) {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  data.buyResult = null;
  data.buyRequest = null;
  data.buyDay = String(year) + String(month) + String(day);
  return data;
}

//無効化
function purifyitemList(list: BuyInfoList): BuyInfoList {
  let result: BuyInfoList = [];
  list.forEach((val, key) => {
    result.push({
      _tag: "BuyInfo",
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

//並び替え:品目ステータス
function buyRequestWantOrder(list: BuyInfoList): void {
  list.sort((a, b) => {
    if (a.buyRequest === b.buyRequest) {
      return 1;
    } else if (!a.buyRequest) {
      return 0;
    } else {
      return -1;
    }
  });
}

export const BuyInfo = {
  createBuyInfo,
  purifyitemList,
  changeBuyStatusTrue,
  createBuyInfoList,
  buyRequestWantOrder,
};
