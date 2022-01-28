import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";
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
  //【課題】UI→Usecaseのリターンをもとにstate変更の考え方でよい？
  //もともとUIからもらったデータをもとに変更していたが。。。modelでのcreate使っていない。
  changeCategoryStore(
    state: State,
    data: { category: Category; id: string }
  ): void {
    state.categorys[Number(data.id)] = data.category;
  },

  loadCategory(state: State, categorys: Array<Category>) {
    state.categorys = categorys;
  },
};

const actions = {
  changeCategoryStore(
    context: { state: State; commit: Commit },
    data: { name: string; id: string; uid: string }
  ) {
    changeCategoryUc(data.name, data.id, data.uid).then(
      (category: Category) => {
        context.commit("changeCategoryStore", {
          category: category,
          id: data.id,
        });
      }
    );
  },
  loadCategory(
    context: { state: State; commit: Commit },
    uid: string
  ): Promise<void> {
    return getCategoryUc(uid).then((v) => {
      if (v) {
        context.commit("loadCategory", v);
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
