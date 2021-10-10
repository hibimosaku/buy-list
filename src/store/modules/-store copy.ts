import { InjectionKey } from "vue";
import { Store } from "vuex";

interface State {}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {};

const mutations = {};

const actions = {};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
