import { InjectionKey } from "vue";
import { Store } from "vuex";
import { BuyList } from "../../model/buy-list.use-case";
import { RequestList } from "../../model/buy-request.use-case";
import {
  changeBuyStatusTrue,
  ItemList,
  SingleItemList,
} from "../../model/item-list.model";
import { ItemListUc } from "../../model/item.use-case";

interface State {
  itemList: null | ItemList;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  itemList: [],
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
    if (state.itemList) {
      state.itemList[state.itemList.length] = {
        _tag: "ItemList",
        item: result,
        categoryId: data.categoryId,
        itemStatus: null,
        buyStatus: null,
        buyDay: null,
      };
    }
  },
  changeItem(
    state: any,
    data: {
      categoryId: string;
      name: string;
      price: number;
      itemId: string;
      userId: string;
      index: any;
    }
  ): void {
    let result = ItemListUc.updateItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.itemId,
      data.userId
    );
    state.itemList.forEach((_val: any, key: string) => {
      if (key === data.index) {
        state.itemList[data.index] = {
          _tag: "ItemList",
          item: result,
          categoryId: state.itemList[data.index].categoryId,
          itemStatus: state.itemList[data.index].itemStatus,
          buyStatus: state.itemList[data.index].buyStatus,
          buyDay: state.itemList[data.index].buyDay,
        };
      }
    });
  },
  deleteItem(
    state: any,
    data: { userId: string; itemId: string; index: string }
  ): void {
    ItemListUc.deleteItemUc(data.userId, data.itemId);
    delete state.itemList[data.index];
  },
  startItems(state: any, userId: string) {
    ItemListUc.getItemListUc(userId).then((val) => {
      state.itemList = val;
    });
  },

  //品目ステータス
  changeItemStatus(
    state: any,
    data: {
      val: SingleItemList;
      status: boolean;
      index: string;
      userId: string;
    }
  ) {
    BuyList.changeItemStatusUc(data);
    state.itemList[data.index] = {
      _tag: "ItemList",
      item: state.itemList[data.index].item,
      categoryId: state.itemList[data.index].categoryId,
      itemStatus: data.status,
      buyStatus: state.itemList[data.index].buyStatus,
      buyDay: state.itemList[data.index].buyDay,
    };
  },

  submitBuyStatus(stete: State, data: { val: ItemList; userId: string }) {
    let result: any = [];
    data.val.forEach((val: SingleItemList) => {
      state.itemList.forEach((v: SingleItemList) => {
        if (val.buyStatus == true && val.item.id === v.item.id) {
          v = changeBuyStatusTrue(val);
          result.push();
        }
      });
    });
    RequestList.changeBuyStatusUc(result, data.userId);
  },
};

const actions = {
  startItems(context: any, userId: string) {
    context.commit("startItems", userId);
  },
  registerItem(
    context: any,
    data: { categoryId: string; name: string; price: number; userId: string }
  ) {
    context.commit("registerItem", data);
  },

  changeItem(
    context: any,
    data: {
      categoryId: string;
      name: string;
      price: number;
      itemId: string;
      userId: string;
      index: any;
    }
  ) {
    context.commit("changeItem", data);
  },
  deleteItem(
    context: any,
    data: { userId: string; itemId: string; index: string }
  ) {
    context.commit("deleteItem", data);
  },
  changeItemStatus(
    context: any,
    data: {
      val: SingleItemList;
      status: boolean;
      index: string;
      userId: string;
    }
  ) {
    context.commit("changeItemStatus", data);
  },
  changeBuyStatus(
    context: any,
    data: {
      val: SingleItemList;
      status: boolean;
      index: string;
      userId: string;
    }
  ) {
    context.commit("changeBuyStatus", data);
  },
};

const getters = {
  getItems: (state: any, userId: string) => {
    return state.itemList;
  },
  getBuyStatusItems: (state: any, userId: string) => {
    // if(state.itemList!==null){
    let result = state.itemList.filter((val: SingleItemList) => {
      return val.itemStatus == true;
    });
    return result; //returnは、stateにしないとリアクティブにならない.component側でcomputed
    // }else{
    //   return null //エラーにする？エラーではないと思っています。
    // }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
