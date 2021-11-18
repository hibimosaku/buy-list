import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { ItemUc } from "../../model/item.use-case";
import { createBuyRequestNum } from "../../model/buy-request-num.value";
import { store } from "../store";

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
            v.item.name = data.name;
          })
          .catch((e) => {});
      } else {
      }
    });
  },

  // sortUpItemStore(state:State,arg:{
  //   targetIndex:number,
  //   prevIndex:number | null,
  //   targetBuyInfo:BuyInfo,
  //   prevBuyInfo:BuyInfo,
  //   uid:string
  // }
  //   ){
  //     ItemUc.sortUpItemUc(
  //       arg.targetIndex,arg.prevIndex,arg.targetBuyInfo,arg.prevBuyInfo,arg.uid
  //     )
  //     .then(()=>{
  //       console.log('1')
  //       state.BuyInfoList[arg.targetIndex-1]=arg.targetBuyInfo
  //       state.BuyInfoList[arg.targetIndex]=arg.prevBuyInfo
  //     })
  //     .catch(()=>{
  //       console.log('error')
  //     })
  // },

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
        v.buyRequestNum = num;
        BuyInfoUseCase.changeBuyRequestNumUc(data.buyRequestNum, v, data.uid);
      } else {
        //【課題】何もしない処理なので、なにもいれなくてよいですよね？エラー処理ではないため、いれなくてよい？
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
    ItemUc.deleteItemUc(data.uid, data.buyInfoId);
    state.BuyInfoList.forEach((v, key) => {
      if (v.buyInfoId == data.buyInfoId) {
        delete state.BuyInfoList[key];
      }
    });
  },
  setItems(state: State, items: BuyInfoList) {
    state.BuyInfoList = items;
  },

  //買物要求の変更
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
        v.buyRequestDo = data.request;
        BuyInfoUseCase.changeBuyRequestDoUc(v, data.request, data.uid);
      }
    });
    //【課題】上と下どちらがよいか？私は上派。上のほうがループしている分無駄？下のindexは信じてよい？
    //処理速度。正規化パターン
    // state.BuyInfoList[data.index] = {
    //   _tag: "BuyInfo",
    //   item: state.BuyInfoList[data.index].item,
    //   buyRequestNum: state.BuyInfoList[data.index].buyRequestNum,
    //   categoryId: state.BuyInfoList[data.index].categoryId,
    //   buyRequest: data.status,
    //   buyResultDo: state.BuyInfoList[data.index].buyResultDo,
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
    data: { buyResultDo: boolean; buyInfoId: string; uid: string }
  ) {
    state.BuyInfoList.forEach((v) => {
      if (v.buyInfoId === data.buyInfoId) {
        BuyInfoUseCase.changeBuyResultDoUc(data.buyResultDo, v, data.uid);
        v.buyResultDo = data.buyResultDo;
      }
    });
  },
  //状態のnull化
  resetBuyRequestDoStore(state: State, data: { id: string }) {
    state.BuyInfoList.forEach((v1) => {
      if (data.id == "all") {
        if (v1.buyRequestDo == true) {
          v1.buyRequestDo = null; //値のためOK
        }
      } else {
        if (data.id == v1.categoryId && v1.buyRequestDo == true) {
          v1.buyRequestDo = null;
        }
      }
    });
  },

  buyFinStore(state: State, data: { buyInfoList: BuyInfoList; uid: string }) {
    state.BuyInfoList.forEach((v: BuyInfo, key) => {
      if (v.buyResultDo == true) {
        state.BuyInfoList[key] = BuyInfo.buyFin(v); //【課題】上とは違うのがいや→参照「key」成功する。配列、オブジェクト
      }
    });
    BuyInfoUseCase.finBuyStatusUc(state.BuyInfoList, data.uid); //【課題】modelのメソッド使っているが。。
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
    ItemUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.uid,
      data.sort
    )
      .then((result: BuyInfo | void) => {
        if (result) {
          console.log("i1");
          context.state.BuyInfoList.push(result);
        } else {
          throw new Error(`createItemError`); //【課題】いる？
        }
      })
      .catch(() => {
        store.commit("errorCreateItem");
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
        ItemUc.changeItemPriceUc(v, data.price, data.uid)
          .then(() => {
            v.item.price = data.price;
            return;
          })
          .catch(() => {});
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
      prevIndex: number | null;
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
      nextIndex: number | null;
      uid: string;
    }
  ) {
    if (arg.nextIndex == null) return;
    if (arg.activeCategory === "all") {
      await ItemUc.sortUpItemUc(
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
        await ItemUc.sortUpItemUc(
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
    let result = state.BuyInfoList.filter((val: BuyInfo) => {
      return val.buyRequestDo == true;
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
