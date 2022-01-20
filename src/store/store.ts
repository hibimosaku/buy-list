import { InjectionKey } from "vue";
import { Commit, createStore, Store } from "vuex";
import category from "./modules/category-store";
import auth from "./modules/auth-store";
import error from "./modules/error-store";
import buyInfoList from "./modules/buy-info-store";

export interface State {
  // nowPage:string
  isProcessing: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isProcessing: false,
  },
  mutations: {
    doProcessing(state: State) {
      state.isProcessing = true;
    },
    notDoProcessing(state: State) {
      state.isProcessing = false;
    },
  },

  actions: {
    doProcessing(context: { state: State; commit: Commit }) {
      context.commit("doProcessing");
      return;
    },
    notDoProcessing(context: { state: State; commit: Commit }) {
      context.commit("notDoProcessing");
      return;
    },
  },

  getters: {
    getProcessing(state: State) {
      return state.isProcessing;
    },
  },

  modules: {
    category,
    buyInfoList,
    auth,
    error,
  },
});
