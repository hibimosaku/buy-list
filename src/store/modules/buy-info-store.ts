import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyInfoUseCase } from "../../model/buy-info.use-case";
import { BuyInfoList, BuyInfo } from "../../model/buy-info.model";
import { itemUc } from "../../model/item.use-case";
import { createBuyRequestNum } from "../../model/buy-request-num.value";
import { store } from "../store";

interface State {
  BuyInfoList: BuyInfoList;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  BuyInfoList: [],
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
        itemUc.changeItemNameUc(v, data.name, data.uid).then(()=>{
          v.item.name = data.name;
        }).catch((e)=>{
          console.log('5',e)
        })
      }
    });
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
  //   itemUc.updateItemList(data.list, data.uid);
  // },

  deleteItemStore(
    state: State,
    data: { uid: string; buyInfoId: string }
  ): void {
    itemUc.deleteItemUc(data.uid, data.buyInfoId);
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

  testPrice(state:State){

  }


};




const actions = {
  loadItems(context: { commit: Commit }, uid: string) {
    return itemUc.loadItemListUc(uid).then((val) => {
      context.commit("setItems", val);
    });
  },
  createItemStore(context:{commit:Commit,state:State},data: { categoryId: string; name: string; price: number; uid: string,sort:number}){
    itemUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.uid,
      data.sort
    ).then((result:BuyInfo | void)=>{
      if(result){
        console.log('i1')
        context.state.BuyInfoList.push(result)
      }else{
        throw new Error(`createItemError`) //【課題】いる？
      }
    }).catch(()=>{
      store.commit('errorCreateItem')
    })
  },

  changeItemPriceStore(
    context:{commit:Commit,state:State},
    data: {
      buyInfoId: string;
      price: number;
      uid: string;
      index: number;
    }
  ) {
    console.log('p1')
    context.state.BuyInfoList.forEach((v) => {
      console.log('p2')
      if (v.buyInfoId == data.buyInfoId) {
        itemUc.changeItemPriceUc(v, data.price, data.uid)
        .then(()=>{
          console.log('p4')
          v.item.price = data.price;
          return
        })
        .catch(()=>{
          console.log('p5')
          throw new Error
        })
      }
    });



    // context.state.BuyInfoList.forEach((v) => {
    //   console.log('p2')
    //   if (v.buyInfoId == data.buyInfoId) {
    //     itemUc.changeItemPriceUc(v, data.price, data.uid)
    //     .then(()=>{
    //       console.log('p4')
    //       v.item.price = data.price;
    //       return
    //     })
    //     .catch(()=>{
    //       console.log('p5')
    //       throw new Error
    //     })
    //   }
    // });
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
