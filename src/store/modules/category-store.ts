import { InjectionKey } from "vue";
import { Store } from "vuex";
import { Category } from "../../model/category.model";
import { getCategoryUc, changeCategoryUc } from "../../model/category.use-case";

interface State {
  categorys: Array<Category>;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  categorys: [],
};

const mutations = {
  changeCategoryStore(
    state: State,
    data: { name: string; id: string; uid: string }
  ): void {
    changeCategoryUc(data.name, data.id, data.uid).then(() => {
      state.categorys[Number(data.id)] = {
        _tag: "Category",
        id: data.id,
        name: data.name,
      };
    });
  },
};

const actions = {
  loadCategory(context: { state: State }, uid: string): Promise<void> {
    return getCategoryUc(uid).then((v) => {
      if (v) {
        context.state.categorys = v;
      }
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
