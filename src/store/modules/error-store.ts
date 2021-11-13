import { InjectionKey } from "vue";
import { Store } from "vuex";

interface State {
  errorChangeCategory: boolean;
  errorGetCategory:boolean
  errorCreateItem:boolean
  errorCreatePrice:boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  errorChangeCategory: false,
  errorGetCategory:false,
  errorCreateItem:false,
  errorCreatePrice:false
};

const mutations = {
  errorChangeCategory(state: State) {
    state.errorChangeCategory = true;
  },
  errorGetCategory(state:State){
    state.errorGetCategory=true
  },
  errorCreateItem(state:State){
    state.errorCreateItem=true
  },
  errorChangeItemPrice(state:State){
    state.errorCreatePrice=true
  }
};

const actions = {


};

const getters = {
  getErrorChangeCategory(state: State) {
    return state.errorChangeCategory;
  },
  getErrorGetCategory(state:State){
    return state.errorGetCategory
  },
  getErrorCreateItem(state:State){
    return state.errorCreateItem
  },
  getErrorchangeItemPrice(state:State){
    return state.errorCreatePrice
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
