import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { ItemListUc } from "../../model/item.use-case";

interface State {
  BuyInfoList: BuyInfoList;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  BuyInfoList: [],
};

const mutations = {
  //品目
  registerItem(
    state: State,
    data: { categoryId: string; name: string; price: number; userId: string }
  ) {
    let result = ItemListUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.userId
    );
    if (state.BuyInfoList) {
      state.BuyInfoList[state.BuyInfoList.length] = {
        _tag: "BuyInfo",
        item: result,
        itemNum: 1, //デフォルト値
        categoryId: data.categoryId,
        buyRequest: null,
        buyResult: null,
        buyDay: null,
      };
    }
  },
  changeItemName(
    state: State,
    data: {
      itemId: string;
      name: string;
      uid: string;
      index: number;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.item.id == data.itemId) {
        v.item.name = data.name;
        ItemListUc.updateItemNameUc(v.item, data.name, data.uid);
      }
    });
  },

  changeItemPrice(
    state: State,
    data: {
      itemId: string;
      price: number;
      uid: string;
      index: number;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.item.id == data.itemId) {
        v.item.price = data.price;
        ItemListUc.updateItemPriceUc(v.item, data.price, data.uid);
      }
    });
  },

  changeItemNum(
    state: State,
    data: { itemNum: number; val: BuyInfo; index: number; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.item.id == data.val.item.id) {
        v.itemNum = data.itemNum;
      }
    });

    BuyInfoUseCase.changeItemNumUc(data.itemNum, data.val, data.uid);
  },

  sortItemList(state: State, data: { list: BuyInfoList; uid: string }) {
    state.BuyInfoList = data.list;
    ItemListUc.updateItemList(data.list, data.uid);
  },

  deleteItem(
    state: State,
    data: { userId: string; itemId: string; index: number }
  ): void {
    ItemListUc.deleteItemUc(data.userId, data.itemId);
    delete state.BuyInfoList[data.index];
  },
  setItems(state: State, items: BuyInfoList) {
    state.BuyInfoList = items;
  },

  //買物要求の変更
  changeBuyRequest(
    state: State,
    data: {
      itemId: string;
      status: boolean;
      uid: string;
    }
  ) {
    state.BuyInfoList.forEach((v) => {
      //【課題】121行目とどちらがよいか？
      if (v.item.id == data.itemId) {
        v.buyRequest = data.status;
        BuyInfoUseCase.changeBuyRequestUc(data.itemId, data.status, data.uid);
      }
    });
    // state.BuyInfoList[data.index] = {
    //   _tag: "BuyInfo",
    //   item: state.BuyInfoList[data.index].item,
    //   itemNum: state.BuyInfoList[data.index].itemNum,
    //   categoryId: state.BuyInfoList[data.index].categoryId,
    //   buyRequest: data.status,
    //   buyResult: state.BuyInfoList[data.index].buyResult,
    //   buyDay: state.BuyInfoList[data.index].buyDay,
    // };
  },
  //買い物結果
  changeBuyResult(
    state: State,
    data: { status: boolean; index: string; val: BuyInfo; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.item.id === data.val.item.id) {
        v.buyResult = data.status;
        BuyInfoUseCase.changeBuyStatusUc(data.status, data.val, data.uid);
      }
    });
  },
  //状態のnull化
  resetBuyStatus(state: State, data: { id: string }) {
    state.BuyInfoList.forEach((v1) => {
      if (data.id == "all") {
        if (v1.buyRequest == true) {
          v1.buyResult = null;
        }
      } else {
        if (data.id == v1.categoryId && v1.buyRequest == true) {
          v1.buyResult = null;
        }
      }
    });
  },

  buyFin(stete: State, data: { val: BuyInfoList; userId: string }) {
    let result: BuyInfoList = [];
    data.val.forEach((val: BuyInfo) => {
      state.BuyInfoList.forEach((v: BuyInfo) => {
        if (val.buyResult == true && val.item.id === v.item.id) {
          v = BuyInfo.changeBuyStatusTrue(val);
          result.push(v);
        }
      });
    });
    BuyInfoUseCase.finBuyStatusUc(result, data.userId);
  },
};

const actions = {
  loadItems(context: { commit: Commit }, userId: string) {
    return ItemListUc.loadItemListUc(userId).then((val) => {
      context.commit("setItems", val);
    });
  },
};
const getters = {
  getItems: (state: State, userId: string) => {
    return state.BuyInfoList;
  },
  getBuyStatusItems: (state: State, userId: string) => {
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
