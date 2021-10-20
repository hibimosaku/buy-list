import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import category from "./modules/category-store";
import itemList from "./modules/item-list-store";

export interface State {}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {},
  mutations: {},

  actions: {},

  getters: {},

  modules: {
    category,
    itemList,
  },
});
