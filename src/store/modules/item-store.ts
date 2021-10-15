import { InjectionKey } from "vue";
import { Store } from "vuex";
import { ItemListUc } from "../../model/item-list.use-case";

interface State {
  items: null | {};
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  items: null,
};

const mutations = {
  registerItem(state: any, data: any) {
    let result= ItemListUc.createItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.userId
    )
    //入れることでOK?
    state.items[state.items.length]={
      _tag: "ItemList",
      item: result,
      categoryId: data.categoryId,
      itemStatus: "no",
      buyStatus: false,
    }
  },
  changeItem(state: any, data: any): void {
    let result =ItemListUc.updateItemUc(
      data.categoryId,
      data.name,
      data.price,
      data.itemId,
      data.userId
    );
    
    state.items.forEach((_val: any,key: any) => {
      if(key===data.index){
        state.items[data.index]={
          _tag: "ItemList",
          item: result,
          categoryId: state.items[data.index].categoryId,
          itemStatus: state.items[data.index].itemStatus,
          buyStatus: state.items[data.index].buyStatus,  
        }
      }else{
        throw new Error('変更失敗')
      }
    })
  },
  deleteItem(state: any, data: any): void {
    ItemListUc.deleteItemListUc(data.userId,data.itemId)
    delete state.items[data.index]
  },
  startItems(state: any, userId: string) {
    if(state.items==null){
      ItemListUc.getItemListUc(userId).then((val) => {
        state.items = val;
      });  
    }
  },
};

const actions = {
  startItems(context: any, userId: string) {
    context.commit("startItems", userId)
  },
  registerItem(context: any, data: any) {
    context.commit("registerItem", data)
  },

  changeItem(context: any, data: any) {
    context.commit("changeItem", data);
  },
  deleteItem(context: any, data: any) {
    context.commit("deleteItem", data);
  },
};

const getters = {
  getItems: (state: any, userId: string) => {
    return state.items;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
