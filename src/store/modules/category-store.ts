import { InjectionKey } from "vue";
import { Store } from "vuex";
import { getCategoryUc, saveCategoryUc } from "../../model/category.use-case";

interface State {
  categorys: null | {};
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  categorys: null,
};

const mutations = {
  startCategory(state: any, userId: string) {
    getCategoryUc(userId).then((v) => {
      state.categorys = v;
    });
  },
  changeCategory(state: any, data: any): void {
    state.categorys = saveCategoryUc(data[0].name, data[1], data[2]);
  },
};

const actions = {
  startCategory(context: any, userId: string): void {
    context.commit("startCategory", userId);
  },
};

const getters = {
  getCategorys: (state: any) => {
    return state.categorys;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
