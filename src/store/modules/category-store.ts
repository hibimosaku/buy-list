import { InjectionKey } from "vue";
import { Store } from "vuex";
import { Category } from "../../model/category.model";
import { getCategoryUc, saveCategoryUc } from "../../model/category.use-case";

interface State {
  categorys: Array<Category>;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  categorys: [],
};

const mutations = {
  changeCategory(
    state: State,
    data: { name: string; id: string; userId: string }
  ): void {
    saveCategoryUc(data.name, data.id, data.userId);
    state.categorys[Number(data.id)] = {
      _tag: "Category",
      id: data.id,
      name: data.name,
    };
  },
};

const actions = {
  loadCategory(context: { state: State }, userId: string): void {
    getCategoryUc(userId).then((v) => {
      context.state.categorys = v;
    });
  },
};

const getters = {
  getCategorys: (state: State) => {
    return state.categorys;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
