import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import category from "./modules/category-store";
import BuyInfoList from "./modules/buy-info-store";
import auth from "./modules/auth-store";
import error from "./modules/error-store";

export interface State {
  // nowPage:string
  isProcessing:boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isProcessing:false
  },
  mutations: {
    doProcessing(state:State){
      state.isProcessing=true
    },
    notDoProcessing(state:State){
      state.isProcessing=false
    }    
  },

  actions: {
    doProcessing(context:{state:State}){
      context.state.isProcessing=true
      return
    },
    notDoProcessing(context:{state:State}){
      context.state.isProcessing=false
      return
    },

  },

  getters: {
    getProcessing(state:State){
      return state.isProcessing
    }
  },

  modules: {
    category,
    BuyInfoList,
    auth,
    error,
  },
});
