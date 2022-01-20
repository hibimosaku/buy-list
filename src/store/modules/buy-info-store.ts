import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { ItemUc } from "../../model/item.use-case";
import { createBuyRequestNum } from "../../model/buy-request-num.value";
import { Item } from "../../model/item.model";
import { ID } from "../../model/id.value";

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
      buyInfoId: ID;
      name: string;
      uid: string;
    }
  ): void {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
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
    data: { buyRequestNum: number; buyInfoId: ID; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
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

  deleteItemStore(state: State, data: { uid: string; buyInfoId: ID }): void {
    ItemUc.deleteItemUc(data.uid, data.buyInfoId)
      .then(() => {
        state.BuyInfoList.forEach((v, key) => {
          if (v.buyInfoId === data.buyInfoId) {
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
      buyInfoId: ID;
      request: boolean;
      uid: string;
    }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
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
    data: { buyResult: boolean; buyInfoId: ID; uid: string }
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
    BuyInfoUseCase.resetBuyResultUc(state.BuyInfoList, data.uid);
    state.BuyInfoList.forEach((v, k) => {
      if (data.id === "all") {
        if (v.buyRequest === true) {
          state.BuyInfoList[k].buyResult = null;
        }
      } else {
        if (data.id === v.categoryId && v.buyRequest === true) {
          state.BuyInfoList[k].buyResult = null;
        }
      }
    });
  },

  resetBuyRequestStore(state: State, data: { id: string; uid: string }) {
    BuyInfoUseCase.resetBuyRequestUc(state.BuyInfoList, data.uid);
    state.BuyInfoList.forEach((v, k) => {
      if (data.id === "all") {
        state.BuyInfoList[k].buyRequest = false;
      } else {
        if (data.id === v.categoryId) {
          state.BuyInfoList[k].buyRequest = false;
        }
      }
    });
  },

  // buyFinStore(state: State, data: { buyInfoList: BuyInfoList; uid: string }) {
  //   BuyInfoUseCase.finBuyStatusUc(state.BuyInfoList, data.uid)
  //   .then(()=>{
  //     console.log('0')
  //     state.BuyInfoList.forEach((v: BuyInfo, key) => {
  //       if (v.buyResult === true) {

  //         state.BuyInfoList[key] = BuyInfo.buyFin(v);
  //         console.log('finSto',state.BuyInfoList[key],BuyInfo.buyFin(v))

  //       }
  //     });
  //   }).catch(()=>{
  //     console.log('2')
  //     throw new Error()
  //   })
  // },
  createItemStore(state: State, buyInfo: BuyInfo) {
    state.BuyInfoList.push(buyInfo);
  },
  changeItemPriceStore(
    state: State,
    data: {
      buyInfoId: ID;
      price: number;
      uid: string;
      index: number;
    }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
        ItemUc.changeItemPriceUc(v, data.price, data.uid).then(() => {
          v.item = Item.changeItemPrice(v.item, data.price);
          return;
        });
      }
    });
  },
  buyFinStore(state: State, day: string) {
    state.BuyInfoList.forEach((v: BuyInfo, key) => {
      if (v.buyResult === true) {
        state.BuyInfoList[key] = BuyInfo.buyFin(v, day);
      }
    });
  },
  sortUpItemStore(
    state: State,
    data: [targetIndex: number, prevIndex: number, BuyInfoList: Array<BuyInfo>]
  ) {
    state.BuyInfoList[data[1]] = data[2][data[0]];
    state.BuyInfoList[data[0]] = data[2][data[1]];
  },
  sortDownItemStore(
    state: State,
    data: [targetIndex: number, nextIndex: number, BuyInfoList: Array<BuyInfo>]
  ) {
    state.BuyInfoList[data[1]] = data[2][data[0]];
    state.BuyInfoList[data[0]] = data[2][data[1]];
  },
  // context.state.BuyInfoList[arg.nextIndex] =
  //   arg.buyInfoList[arg.targetIndex];
  // context.state.BuyInfoList[arg.targetIndex] =
  //   arg.buyInfoList[arg.nextIndex];
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
          context.commit("createItemStore", result);
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
      buyInfoId: ID;
      price: number;
      uid: string;
      index: number;
    }
  ) {
    context.commit("changeItemPriceStore", data);
  },

  buyFinStore(
    context: { state: State; commit: Commit },
    data: { buyInfoList: BuyInfoList; uid: string }
  ) {
    const day = BuyInfo.createBuyResultDay();
    return BuyInfoUseCase.finBuyUc(state.BuyInfoList, data.uid, day)
      .then(() => {
        context.commit("buyFinStore", day);
      })
      .catch(() => {
        throw new Error();
      });
  },

  async sortUpItemStore(
    context: { commit: Commit; state: State },
    arg: {
      buyInfoList: BuyInfoList;
      categoryBuyInfoList: BuyInfoList;
      activeCategory: string;
      targetBuyinfoId: ID;
      prevBuyInfoId: ID;
      targetIndex: number;
      prevIndex: number;
      uid: string;
    }
  ) {
    if (arg.prevIndex === null) return;

    if (arg.activeCategory === "all") {
      await ItemUc.sortUpItemUc(
        arg.targetIndex,
        arg.prevIndex,
        arg.buyInfoList[arg.targetIndex],
        arg.buyInfoList[arg.prevIndex],
        arg.uid
      ).then(() => {
        if (arg.activeCategory === "all" && arg.prevIndex != null) {
          context.commit("sortUpItemStore", [
            arg.targetIndex,
            arg.prevIndex,
            arg.buyInfoList,
          ]);
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
      console.log("up", targetIndex, prevIndex, arg.buyInfoList);
      if (targetIndex != undefined && prevIndex != undefined) {
        await ItemUc.sortUpItemUc(
          targetIndex,
          prevIndex,
          arg.buyInfoList[targetIndex],
          arg.buyInfoList[prevIndex],
          arg.uid
        ).then(() => {
          if (targetIndex != undefined && prevIndex != undefined) {
            context.commit("sortUpItemStore", [
              targetIndex,
              prevIndex,
              arg.buyInfoList,
            ]);
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
      targetBuyinfoId: ID;
      nextBuyInfoId: ID;
      targetIndex: number;
      nextIndex: number;
      uid: string;
    }
  ) {
    if (arg.nextIndex === null) return;
    if (arg.activeCategory === "all") {
      await ItemUc.sortDownItemUc(
        arg.targetIndex,
        arg.nextIndex,
        arg.buyInfoList[arg.targetIndex],
        arg.buyInfoList[arg.nextIndex],
        arg.uid
      ).then(() => {
        if (arg.activeCategory === "all" && arg.nextIndex != null) {
          context.commit("sortDownItemStore", [
            arg.targetIndex,
            arg.nextIndex,
            arg.buyInfoList,
          ]);
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
            context.commit("sortDownItemStore", [
              targetIndex,
              nextIndex,
              arg.buyInfoList,
            ]);
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
      return val.buyRequest === true;
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
