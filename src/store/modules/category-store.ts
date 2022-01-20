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
    data: { name: string; id: string; uid: string }
  ): void {
    changeCategoryUc(data.name, data.id, data.uid).then(
      (category: Category) => {
        state.categorys[Number(data.id)] = category;
      }
    );
  },
  loadCategory(state: State, categorys: Array<Category>) {
    state.categorys = categorys;
  },
};

const actions = {
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
