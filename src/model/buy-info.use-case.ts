//買い物リストのユースケース

import { BuyInfo, BuyInfoList } from "./buy-info.model";
import { BuyInfoRepository } from "./buy-info.repository";
import { createBuyRequest } from "./buy-request.value";

//buyRequestの切り替え
function changeBuyRequestUc(itemId: string, status: boolean, userId: string) {
  const buyRequest = createBuyRequest(status);
  BuyInfoRepository.updatebuyRequest(itemId, buyRequest, userId);
}

function changeItemNumUc(itemNum: number, list: BuyInfo, uid: string) {
  BuyInfoRepository.updateItemNum(itemNum, list, uid);
}

function finBuyStatusUc(data: BuyInfoList, userId: string) {
  BuyInfoRepository.updateItemList(data, userId);
}

function changeBuyStatusUc(status: boolean, data: BuyInfo, uid: string) {
  BuyInfoRepository.updateBuyStatus(status, data, uid);
}

export const BuyInfoUseCase = {
  changeBuyRequestUc,
  changeItemNumUc,
  finBuyStatusUc,
  changeBuyStatusUc,
};
