import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { ItemUc } from "../../model/item.use-case";
import { createBuyRequestNum } from "../../model/buy-request-num.value";
import { Item } from "../../model/item.model";

interface State {
  BuyInfoList: BuyInfoList;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  BuyInfoList: Array(), //[]から変更。「never型のパラメータに割り当てることができない」エラー対策
};

const mutations = {
  //品目
  changeItemNameStore(
    state: State,
    data: {
      buyInfoId: string;
      name: string;
      uid: string;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        ItemUc.changeItemNameUc(v, data.name, data.uid)
          .then(() => {
            v.item = Item.changeItemName(v.item, data.name);
          })
          .catch((e) => {});
      } else {
      }
    });
  },

  setSortUpItemStore(
    state: State,
    arg: {
      targetIndex: number;
      prevIndex: number | null;
      targetBuyInfo: BuyInfo;
      prevBuyInfo: BuyInfo;
      uid: string;
    }
  ) {
    state.BuyInfoList[arg.targetIndex - 1] = arg.targetBuyInfo;
    state.BuyInfoList[arg.targetIndex] = arg.prevBuyInfo;
  },

  changeBuyRequestNumStore(
    state: State,
    data: { buyRequestNum: number; buyInfoId: string; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        const num = createBuyRequestNum(data.buyRequestNum);
        BuyInfoUseCase.changeBuyRequestNumUc(data.buyRequestNum, v, data.uid)
          .then(() => {
            v.buyRequestNum = num;
          })
          .catch(() => {
            return;
          });
      } else {
      }
    });
  },

  // sortItemListStore(state: State, data: { list: BuyInfoList; uid: string }) {
  //   state.BuyInfoList = data.list;
  //   ItemUc.updateItemList(data.list, data.uid);
  // },

  deleteItemStore(
    state: State,
    data: { uid: string; buyInfoId: string }
  ): void {
    ItemUc.deleteItemUc(data.uid, data.buyInfoId)
      .then(() => {
        state.BuyInfoList.forEach((v, key) => {
          if (v.buyInfoId == data.buyInfoId) {
            delete state.BuyInfoList[key];
          }
        });
      })
      .catch(() => {
        return;
      });
  },

  setItems(state: State, items: BuyInfoList) {
    state.BuyInfoList = items;
  },

  changeBuyRequestDoStore(
    state: State,
    data: {
      buyInfoId: string;
      request: boolean;
      uid: string;
    }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        BuyInfoUseCase.changeBuyRequestUc(v, data.request, data.uid)
          .then(() => {
            v.buyRequest = data.request;
          })
          .catch(() => {
            return;
          });
      }
    });
    //【課題→解決】上と下どちらがよいか？私は上派。上のほうがループしている分無駄？下のindexは信じてよい？
    //処理速度。正規化パターン
    // state.BuyInfoList[data.index] = {
    //   _tag: "BuyInfo",
    //   item: state.BuyInfoList[data.index].item,
    //   buyRequestNum: state.BuyInfoList[data.index].buyRequestNum,
    //   categoryId: state.BuyInfoList[data.index].categoryId,
    //   buyRequest: data.status,
    //   buyResult: state.BuyInfoList[data.index].buyResult,
    //   buyResultDay: state.BuyInfoList[data.index].buyResultDay,
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
        BuyInfoUseCase.changeBuyResultUc(data.buyResult, v, data.uid)
          .then(() => {
            v.buyResult = data.buyResult;
          })
          .catch(() => {
            return;
          });
      }
    });
  },
  //状態のnull化
  resetBuyResultStore(state: State, data: { id: string; uid: string }) {
    state.BuyInfoList.forEach((v, k) => {
      if (data.id == "all") {
        if (v.buyRequest == true) {
          state.BuyInfoList[k].buyResult = null;
        }
      } else {
        if (data.id == v.categoryId && v.buyRequest == true) {
          state.BuyInfoList[k].buyResult = null;
        }
      }
    });
    BuyInfoUseCase.resetBuyResultUc(state.BuyInfoList, data.uid);
  },

  buyFinStore(state: State, data: { buyInfoList: BuyInfoList; uid: string }) {
    state.BuyInfoList.forEach((v: BuyInfo, key) => {
      if (v.buyResult == true) {
        state.BuyInfoList[key] = BuyInfo.buyFin(v); //【課題→解決】上とは違うのがいや→参照「key」成功する。配列、オブジェクト
      }
    });
    BuyInfoUseCase.finBuyStatusUc(state.BuyInfoList, data.uid).catch(() => {
      return;
    });
  },
};

const actions = {
  loadItemsStore(context: { commit: Commit }, uid: string) {
    return ItemUc.loadItemListUc(uid).then((val) => {
      context.commit("setItems", val);
    });
  },
  createItemStore(
    context: { commit: Commit; state: State },
    data: {
      categoryId: string;
      name: string;
      price: number;
      uid: string;
      sort: number;
    }
  ) {
    return ItemUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.uid,
      data.sort
    )
      .then((result: BuyInfo | void) => {
        if (result) {
          context.state.BuyInfoList.push(result);
        } else {
          return;
        }
      })
      .catch(() => {
        throw new Error();
      });
  },

  changeItemPriceStore(
    context: { commit: Commit; state: State },
    data: {
      buyInfoId: string;
      price: number;
      uid: string;
      index: number;
    }
  ) {
    context.state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId == data.buyInfoId) {
        ItemUc.changeItemPriceUc(v, data.price, data.uid).then(() => {
          v.item = Item.changeItemPrice(v.item, data.price);
          return;
        });
      }
    });
  },

  async sortUpItemStore(
    context: { commit: Commit; state: State },
    arg: {
      buyInfoList: BuyInfoList;
      categoryBuyInfoList: BuyInfoList;
      activeCategory: string;
      targetBuyinfoId: string;
      prevBuyInfoId: string;
      targetIndex: number;
      prevIndex: number;
      uid: string;
    }
  ) {
    if (arg.prevIndex == null) return;

    if (arg.activeCategory === "all") {
      await ItemUc.sortUpItemUc(
        arg.targetIndex,
        arg.prevIndex,
        arg.buyInfoList[arg.targetIndex],
        arg.buyInfoList[arg.prevIndex],
        arg.uid
      ).then(() => {
        if (arg.activeCategory === "all" && arg.prevIndex != null) {
          context.state.BuyInfoList[arg.prevIndex] =
            arg.buyInfoList[arg.targetIndex];
          context.state.BuyInfoList[arg.targetIndex] =
            arg.buyInfoList[arg.prevIndex];
        } else {
          return;
        }
      });
    } else {
      const targetIndex = BuyInfo.RetrieveIndex(
        arg.buyInfoList,
        arg.targetBuyinfoId
      );
      const prevIndex = BuyInfo.RetrieveIndex(
        arg.buyInfoList,
        arg.prevBuyInfoId
      );
      if (targetIndex != undefined && prevIndex != undefined) {
        await ItemUc.sortUpItemUc(
          targetIndex,
          prevIndex,
          arg.buyInfoList[targetIndex],
          arg.buyInfoList[prevIndex],
          arg.uid
        ).then(() => {
          if (targetIndex != undefined && prevIndex != undefined) {
            context.state.BuyInfoList[prevIndex] = arg.buyInfoList[targetIndex];
            context.state.BuyInfoList[targetIndex] = arg.buyInfoList[prevIndex];
          }
        });
      }
    }
  },

  async sortDownItemStore(
    context: { commit: Commit; state: State },
    arg: {
      buyInfoList: BuyInfoList;
      activeCategory: string;
      targetBuyinfoId: string;
      nextBuyInfoId: string;
      targetIndex: number;
      nextIndex: number;
      uid: string;
    }
  ) {
    if (arg.nextIndex == null) return;
    if (arg.activeCategory === "all") {
      await ItemUc.sortDownItemUc(
        arg.targetIndex,
        arg.nextIndex,
        arg.buyInfoList[arg.targetIndex],
        arg.buyInfoList[arg.nextIndex],
        arg.uid
      ).then(() => {
        if (arg.activeCategory === "all" && arg.nextIndex != null) {
          context.state.BuyInfoList[arg.nextIndex] =
            arg.buyInfoList[arg.targetIndex];
          context.state.BuyInfoList[arg.targetIndex] =
            arg.buyInfoList[arg.nextIndex];
        } else {
          return;
        }
      });
    } else {
      const targetIndex = BuyInfo.RetrieveIndex(
        arg.buyInfoList,
        arg.targetBuyinfoId
      );
      const nextIndex = BuyInfo.RetrieveIndex(
        arg.buyInfoList,
        arg.nextBuyInfoId
      );
      if (targetIndex != undefined && nextIndex != undefined) {
        await ItemUc.sortDownItemUc(
          targetIndex,
          nextIndex,
          arg.buyInfoList[targetIndex],
          arg.buyInfoList[nextIndex],
          arg.uid
        ).then(() => {
          if (targetIndex != undefined && nextIndex != undefined) {
            context.state.BuyInfoList[nextIndex] = arg.buyInfoList[targetIndex];
            context.state.BuyInfoList[targetIndex] = arg.buyInfoList[nextIndex];
          }
        });
      }
    }
  },
};

const getters = {
  getBuyInfoList: (state: State, uid: string) => {
    return state.BuyInfoList;
  },
  getBuyResultList: (state: State, uid: string) => {
    const result = state.BuyInfoList.filter((val: BuyInfo) => {
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
