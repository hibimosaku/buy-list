import { InjectionKey } from "vue";
import { Store } from "vuex";

// interface errorCreatePrice{
//   id:number,
//   err:boolean
// }

interface State {
  errorChangeCategory: boolean;
  errorGetCategory: boolean;
  errorCreateItem: boolean;
  errorCreatePrice: boolean;
  errorChangeItemPrice: boolean;

  // errCreatePriceList:Array<errorCreatePrice>
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  errorChangeCategory: false,
  errorGetCategory: false,
  errorCreateItem: false,
  errorCreatePriceList: false,
  errorChangeItemPrice: false,
};

const mutations = {
  errorChangeCategory(state: State) {
    state.errorChangeCategory = true;
  },
  errorGetCategory(state: State) {
    state.errorGetCategory = true;
  },
  errorCreateItem(state: State) {
    state.errorCreateItem = true;
  },
  errorCreatePrice(state: State) {
    state.errorCreatePrice = true;
  },

  errorChangeItemPrice(state: State, id: number) {
    state.errorChangeItemPrice = true;
  },
};

const actions = {};

const getters = {
  getErrorChangeCategory(state: State) {
    return state.errorChangeCategory;
  },
  getErrorGetCategory(state: State) {
    return state.errorGetCategory;
  },
  getErrorCreateItem(state: State) {
    return state.errorCreateItem;
  },
  getErrorchangeItemPrice(state: State) {
    return state.errorCreatePrice;
  },
  getErrorChangeItemPrice(state: State) {
    //【課題】詳細な情報は無理がある？
    return state.errorChangeItemPrice;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
