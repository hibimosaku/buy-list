import { InjectionKey } from "vue";
import { Store } from "vuex";
import { ItemRepository } from "../../model/item.repository";
import { saveItemUc } from "../../model/item.use-case";

interface State {
  items: null | {};
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  items: null,
};

const mutations = {
  changeItem(state: any, data: any): void {
    state.items = saveItemUc(data[0], data[1], data[2], data[3]);
  },
  deleteItem(state: any, data: any): void {
    ItemRepository.deleteItem(data[0], data[1]);
  },
};

const actions = {
  changeItem(context: any, data: any) {
    context.commit("changeItem", data);
  },
  deleteItem(context: any, data: any) {
    context.commit("deleteItem", data);
  },
};

const getters = {
  getItems: (state: any, userId: string) => {
    return state.items;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
