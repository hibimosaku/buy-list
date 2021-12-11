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
    console.log(changeBuyInfo)

    await BuyInfoRepository.updateBuyRequestNumRep(changeBuyInfo, uid);
  } catch (e) {
    store.commit("isErrorDbBuyList");
    console.error(`errMethod:changeBuyRequestNum,${e}`);
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

async function finBuyUc(data: BuyInfoList, uid: string,day:BuyInfo['buyResultDay']) {
  try {
    await BuyInfoRepository.updateBuyfinRep(data, uid,day);
  } catch (e) {
    store.commit("isErrorDbBuyAct");
    console.error(`errMethod:finBuyStatus,${e}`);
    throw new Error();
  }
}

async function resetBuyRequestUc(data:BuyInfoList,uid:string){
  try {
    await BuyInfoRepository.updateResetBuyRequestRep(data,uid);
  }catch(e){
    console.error(`errMethod:resetBuyRequestUc,${e}`);
    throw new Error()
  }
}

async function resetBuyResultUc(data: BuyInfoList, uid: string) {
  try {
    await BuyInfoRepository.updateResetBuyResultRep(data, uid);
  } catch (e) {
    store.commit("isErrorDbBuyAct");
    console.error(`errMethod:resetBuyResult,${e}`);
    throw new Error();
  }
}

export const BuyInfoUseCase = {
  changeBuyRequestUc,
  changeBuyRequestNumUc,
  finBuyUc,
  changeBuyResultUc,
  resetBuyResultUc,
  resetBuyRequestUc
};
