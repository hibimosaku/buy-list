import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { ItemRepository } from "../model/item.repository";
import { saveItemUc } from "../model/item.use-case";
import category from "./modules/category-store";

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
  },
});
