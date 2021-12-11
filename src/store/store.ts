import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import category from "./modules/category-store";
import BuyInfoList from "./modules/buy-info-store";
import auth from "./modules/auth-store";
import error from "./modules/error-store";

export interface State {
  // nowPage:string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {},
  mutations: {},

  actions: {},

  getters: {},

  modules: {
    category,
    BuyInfoList,
    auth,
    error,
  },
});
