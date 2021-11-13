//買い物リストのユースケース

import { BuyInfo, BuyInfoList } from "./buy-info.model";
import { BuyInfoRepository } from "./buy-info.repository";

//buyRequestの切り替え
function changeBuyRequestDoUc(buyInfo: BuyInfo, request: boolean, uid: string) {
  const changeBuyInfo = BuyInfo.changeBuyRequestDo(buyInfo, request);
  BuyInfoRepository.updatebuyRequestDoRep(changeBuyInfo, uid);
}

function changeBuyRequestNumUc(
  buyRequestNum: number,
  buyInfo: BuyInfo,
  uid: string
) {
  const changeBuyInfo = BuyInfo.changeBuyRequestNum(buyInfo, buyRequestNum);
  BuyInfoRepository.updateItemNumRep(changeBuyInfo, uid);
}

function finBuyStatusUc(data: BuyInfoList, uid: string) {
  BuyInfoRepository.updateItemListRep(data, uid);
}

function changeBuyResultDoUc(result: boolean, buyInfo: BuyInfo, uid: string) {
  const changeBuyResult = BuyInfo.changeBuyResultDo(buyInfo, result);
  if (changeBuyResult) {
    BuyInfoRepository.updateBuyResultDoRep(changeBuyResult, uid);
  }
}

export const BuyInfoUseCase = {
  changeBuyRequestDoUc,
  changeBuyRequestNumUc,
  finBuyStatusUc,
  changeBuyResultDoUc,
};
