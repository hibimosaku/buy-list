//買い物リストのユースケース

import { BuyInfo, BuyInfoList } from "./buy-info.model";
import { BuyInfoRepository } from "./buy-info.repository";

//buyRequestの切り替え
function changeBuyRequestUc(buyInfo: BuyInfo, request: boolean, uid: string) {
  const changeBuyInfo = BuyInfo.changeBuyRequest(buyInfo, request);
  BuyInfoRepository.updatebuyRequestRep(changeBuyInfo, uid);
}

function changeItemNumUc(itemNum: number, buyInfo: BuyInfo, uid: string) {
  const changeBuyInfo = BuyInfo.changeItemNum(buyInfo, itemNum);
  BuyInfoRepository.updateItemNumRep(changeBuyInfo, uid);
}

function finBuyStatusUc(data: BuyInfoList, uid: string) {
  BuyInfoRepository.updateItemListRep(data, uid);
}

function changeBuyResultUc(result: boolean, buyInfo: BuyInfo, uid: string) {
  const changeBuyResult = BuyInfo.changeBuyResult(buyInfo, result);
  if (changeBuyResult) {
    BuyInfoRepository.updateBuyResultRep(changeBuyResult, uid);
  }
}

export const BuyInfoUseCase = {
  changeBuyRequestUc,
  changeItemNumUc,
  finBuyStatusUc,
  changeBuyResultUc,
};
