//買い物リストのユースケース

import { store } from "../store/store";
import { BuyInfo, BuyInfoList } from "./buy-info.model";
import { BuyInfoRepository } from "./buy-info.repository";

//buyRequestの切り替え
async function changeBuyRequestUc(
  buyInfo: BuyInfo,
  request: boolean,
  uid: string
) {
  try {
    const changeBuyInfo = BuyInfo.changeBuyRequestDo(buyInfo, request);
    await BuyInfoRepository.updateBuyRequestRep(changeBuyInfo, uid);
  } catch (e) {
    store.commit("isErrorDbBuyList");
    console.error(`errMethod:changeBuyRequestDo,${e}`);
    throw new Error();
  }
}

async function changeBuyRequestNumUc(
  buyRequestNum: number,
  buyInfo: BuyInfo,
  uid: string
) {
  try {
    const changeBuyInfo = BuyInfo.changeBuyRequestNum(buyInfo, buyRequestNum);
    await BuyInfoRepository.updateItemNumRep(changeBuyInfo, uid);
  } catch (e) {
    store.commit("isErrorDbBuyList");
    console.error(`errMethod:changeBuyRequest,${e}`);
    throw new Error();
  }
}

async function changeBuyResultUc(
  result: boolean,
  buyInfo: BuyInfo,
  uid: string
) {
  try {
    const changeBuyResult = BuyInfo.changeBuyResultDo(buyInfo, result);
    if (changeBuyResult) {
      await BuyInfoRepository.updateBuyResultRep(changeBuyResult, uid);
    }
  } catch (e) {
    store.commit("isErrorDbBuyList");
    console.error(`errMethod:changeBuyRequest,${e}`);
    throw new Error();
  }
}

async function finBuyStatusUc(data: BuyInfoList, uid: string) {
  try {
    await BuyInfoRepository.updateItemListRep(data, uid);
  } catch (e) {
    store.commit("isErrorDbBuyAct");
    console.error(`errMethod:finBuyStatus,${e}`);
    throw new Error();
  }
}

async function resetBuyResultUc(data: BuyInfoList, uid: string) {
  try {
    await BuyInfoRepository.updateItemListRep(data, uid);
  } catch (e) {
    store.commit("isErrorDbBuyAct");
    console.error(`errMethod:resetBuyResult,${e}`);
    throw new Error();
  }
}

export const BuyInfoUseCase = {
  changeBuyRequestUc,
  changeBuyRequestNumUc,
  finBuyStatusUc,
  changeBuyResultUc,
  resetBuyResultUc,
};
