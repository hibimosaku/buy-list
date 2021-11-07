import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { itemUc } from "../../model/item.use-case";

interface State {
  BuyInfoList: BuyInfoList;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  BuyInfoList: [],
};

const mutations = {
  //品目
  createItemStore(
    state: State,
    data: { categoryId: string; name: string; price: number; uid: string }
  ) {
    const result = itemUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.uid
    );
    if (state.BuyInfoList) {
      state.BuyInfoList[state.BuyInfoList.length] = result;
    }
  },
  changeItemNameStore(
    state: State,
    data: {
      buyInfoId: string;
      name: string;
      uid: string;
      // index: number;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        v.item.name = data.name;
        itemUc.changeItemNameUc(v, data.name, data.uid);
      }
    });
  },

  changeItemPriceStore(
    state: State,
    data: {
      buyInfoId: string;
      price: number;
      uid: string;
      index: number;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        v.item.price = data.price;
        itemUc.changeItemPriceUc(v, data.price, data.uid);
      }
    });
  },

  changeItemNumStore(
    state: State,
    data: { itemNum: number; buyInfoId: string; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        v.itemNum = data.itemNum;
        BuyInfoUseCase.changeItemNumUc(data.itemNum, v, data.uid);
      } else {
        //【課題】何もしない処理なので、なにもいれなくてよいですよね？エラー処理ではないため、いれなくてよい？
      }
    });
  },

  sortItemList(state: State, data: { list: BuyInfoList; uid: string }) {
    state.BuyInfoList = data.list;
    itemUc.updateItemList(data.list, data.uid);
  },

  deleteItemStore(
    state: State,
    data: { uid: string; buyInfoId: string }
  ): void {
    itemUc.deleteItemUc(data.uid, data.buyInfoId);
    state.BuyInfoList.forEach((v, key) => {
      if (v.buyInfoId == data.buyInfoId) {
        console.log(state.BuyInfoList[key]);
        delete state.BuyInfoList[key];
      }
    });
  },
  setItems(state: State, items: BuyInfoList) {
    state.BuyInfoList = items;
  },

  //買物要求の変更
  changeBuyRequestStore(
    state: State,
    data: {
      buyInfoId: string;
      request: boolean;
      uid: string;
    }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        v.buyRequest = data.request;
        BuyInfoUseCase.changeBuyRequestUc(v, data.request, data.uid);
      }
    });
    //【課題】上と下どちらがよいか？私は上派。上のほうがループしている分無駄？下のindexは信じてよい？
    //処理速度。正規化パターン
    // state.BuyInfoList[data.index] = {
    //   _tag: "BuyInfo",
    //   item: state.BuyInfoList[data.index].item,
    //   itemNum: state.BuyInfoList[data.index].itemNum,
    //   categoryId: state.BuyInfoList[data.index].categoryId,
    //   buyRequest: data.status,
    //   buyResult: state.BuyInfoList[data.index].buyResult,
    //   buyDay: state.BuyInfoList[data.index].buyDay,
    // };

    // {
    //   values: {
    //     'AshuUUGDJBu2': <Entity>,
    //     'AshuUUGDJBu3': <Entity>,
    //     'AshuUUGDJBu4': <Entity>,
    //     'AshuUUGDJBu5': <Entity>,
    //   },
    //   entries: [ 'AshuUUGDJBu4', 'AshuUUGDJBu3', 'AshuUUGDJBu2', 'AshuUUGDJBu5' ],
    // };
  },
  //買い物結果
  changeBuyResultStore(
    state: State,
    data: { buyResult: boolean; buyInfoId: string; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
        BuyInfoUseCase.changeBuyResultUc(data.buyResult, v, data.uid);
        v.buyResult = data.buyResult;
      }
    });
  },
  //状態のnull化
  resetBuyStatusStore(state: State, data: { id: string }) {
    state.BuyInfoList.forEach((v1) => {
      if (data.id == "all") {
        if (v1.buyRequest == true) {
          v1.buyResult = null; //値のためOK
        }
      } else {
        if (data.id == v1.categoryId && v1.buyRequest == true) {
          v1.buyResult = null;
        }
      }
    });
  },

  buyFinStore(state: State, data: { buyInfoList: BuyInfoList; uid: string }) {
    state.BuyInfoList.forEach((v: BuyInfo, key) => {
      if (v.buyResult == true) {
        state.BuyInfoList[key] = BuyInfo.changeBuyFin(v); //【課題】上とは違うのがいや→参照「key」成功する。配列、オブジェクト
      }
    });
    BuyInfoUseCase.finBuyStatusUc(state.BuyInfoList, data.uid); //【課題】modelのメソッド使っているが。。
  },
};

const actions = {
  loadItems(context: { commit: Commit }, uid: string) {
    return itemUc.loadItemListUc(uid).then((val) => {
      context.commit("setItems", val);
    });
  },
};
const getters = {
  getItems: (state: State, uid: string) => {
    return state.BuyInfoList;
  },
  getBuyStatusItems: (state: State, uid: string) => {
    let result = state.BuyInfoList.filter((val: BuyInfo) => {
      return val.buyRequest == true;
    });
    return result; //returnは、stateにしないとリアクティブにならない.component側でcomputed
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
