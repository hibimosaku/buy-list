import { InjectionKey } from "vue";
import { Store } from "vuex";

// interface errorCreatePrice{
//   id:number,
//   err:boolean
// }

interface State {
  isErrorDbCategory: boolean;
  isErrorDbItem: boolean;
  isErrorDbBuyList: boolean;
  isErrorDbBuyAct: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  isErrorDbCategory: false,
  isErrorDbItem: false,
  isErrorDbBuyList: false,
  isErrorDbBuyAct: false,
};

const mutations = {
  isErrorDbCategory(state: State) {
    state.isErrorDbCategory = true;
  },
  isErrorDbItem(state: State) {
    state.isErrorDbItem = true;
  },
  isErrorDbFalse(state: State) {
    state.isErrorDbCategory = false;
    state.isErrorDbItem = false;
    state.isErrorDbBuyList = false;
    state.isErrorDbBuyList = false;
  },

  isErrorDbBuyList(state: State) {
    state.isErrorDbBuyList = true;
  },
  isErrorDbBuyAct(state: State) {
    state.isErrorDbBuyList = true;
  },
};

const actions = {};

const getters = {
  getIsErrorCategory(state: State) {
    return state.isErrorDbCategory;
  },
  getErrorItem(state: State) {
    return state.isErrorDbItem;
  },
  getErrorBuyList(state: State) {
    return state.isErrorDbBuyList;
  },
  getErrorBuyAct(state: State) {
    return state.isErrorDbBuyList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
