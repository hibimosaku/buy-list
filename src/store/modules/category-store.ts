import { InjectionKey } from "vue";
import { Store } from "vuex";
import { getCategoryUc, saveCategoryUc } from "../../model/category.use-case";

interface State {
  categorys: null | [];
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  categorys: null,
};

const mutations = {
  changeCategory(
    state: any,
    data: { name: string; id: string; userId: string }
  ): void {
    state.categorys = saveCategoryUc(data.name, data.id, data.userId);
  },
};

const actions = {
  startCategory(context: any, userId: string): void {
    if (state.categorys == null) {
      getCategoryUc(userId).then((v) => {
        state.categorys = v;
      });
    }
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
