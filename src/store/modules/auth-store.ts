import { InjectionKey } from "vue";
import { Store } from "vuex";

interface State {
  uid: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  uid: "",
};

const mutations = {
  registerAuth(state: State, uid: string) {
    state.uid = uid;
  },
};

const actions = {};

const getters = {
  getUid: (state: State) => {
    return state.uid;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
