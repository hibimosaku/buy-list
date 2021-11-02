import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";

import { BuyList } from "../../model/buy-list.use-case";
import { RequestList } from "../../model/buy-request.use-case";
import { ItemList, SingleItemList } from "../../model/item-list.model";
import { ItemListUc } from "../../model/item.use-case";

interface State {
  itemList: ItemList;
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
  changeItemName(
    state: State,
    data: {
      val: SingleItemList;
      uid: string;
      index: number;
    }
  ): void {
    ItemListUc.updateItemNameUc(data.val, data.uid);
    state.itemList.forEach((v) => {
      if (v.item.id == data.val.item.id) {
        v.item.name = data.val.item.name;
      }
    });
  },

  changeItemPrice(
    state: State,
    data: {
      val: SingleItemList;
      uid: string;
      index: number;
    }
  ): void {
    ItemListUc.updateItemPriceUc(data.val, data.uid);
    state.itemList.forEach((v) => {
      if (v.item.id == data.val.item.id) {
        v.item.price = data.val.item.price;
      }
    });
  },

  sortItemList(state:State,data:{list:ItemList,uid:string}){
    state.itemList=data.list
    ItemListUc.updateItemList(data.list,data.uid)    



  },


  deleteItem(
    state: State,
    data: { userId: string; itemId: string; index: number }
  ): void {
    ItemListUc.deleteItemUc(data.userId, data.itemId);
    delete state.itemList[data.index];
  },
  setItems(state: State, items: ItemList) {
    state.itemList = items;
  },

  //品目ステータス
  changeItemStatus(
    state: State,
    data: {
      val: SingleItemList;
      status: boolean;
      index: number;
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
  //買い物
  changeBuyStatus(
    state: State,
    data: { status: boolean; index: string; val: SingleItemList,uid:string }
  ) {
    state.itemList.forEach((v) => {
      if (v.item.id === data.val.item.id) {

        v.buyStatus = data.status;
        RequestList.changeBuyStatusUc(data.status,data.val,data.uid)
      }
    });
  },

  resetBuyStatus(state:State,data:{id:string}){
    state.itemList.forEach((v1)=>{
        if(data.id=='all'){
          if(v1.itemStatus==true){
            v1.buyStatus=null
          }
        }else{
          if(data.id==v1.categoryId && v1.itemStatus==true){
            v1.buyStatus=null
          }
        }        
    })
  },

  buyFin(stete: State, data: { val: ItemList; userId: string }) {
    let result: ItemList = [];
    data.val.forEach((val: SingleItemList) => {
      state.itemList.forEach((v: SingleItemList) => {
        if (val.buyStatus == true && val.item.id === v.item.id) {
          v = ItemList.changeBuyStatusTrue(val);
          result.push(v);
        }
      });
    });
    RequestList.finBuyStatusUc(result, data.userId);
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
    return state.itemList;
  },
  getBuyStatusItems: (state: State, userId: string) => {
    let result = state.itemList.filter((val: SingleItemList) => {
      return val.itemStatus == true;
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
