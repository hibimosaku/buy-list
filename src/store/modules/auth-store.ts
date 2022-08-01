import { InjectionKey } from "vue";
import { Commit, Store } from "vuex";
import { AuthUseCase } from "../../model/auth.use-case";

interface State {
  uid: string;
  user:string
}

export const key: InjectionKey<Store<State>> = Symbol();

const state = {
  uid: "",
  user:""
};

const mutations = {
  registerAuth(state: State, uid: string) {
    state.uid = uid;
  },
  registerAuthUser(state: State, user: any) {
    state.user = user;
  },

};

const actions = {
  registerAuth(context:{state:State,commit:Commit},user:any){
    context.commit("registerAuthUser",user)
  },
  loginStore(context: { state: State,commit:Commit }){
    
  },
  singOutStore(context: { state: State }) {
    return AuthUseCase.signOUtUc()
      .then(() => {
        context.state.uid = "";
        return;
      })
      .catch(() => {
        throw new Error();
      });
  },
  async userDeleteStore(context: { state: State }) {
    return AuthUseCase.userDeleteUc()
      .then(() => {
        state.uid = "";
        return;
      })
      .catch(() => {
        throw new Error();
      });
  },
  async forgetPwStore(context: { state: State }, mail: string) {
    return AuthUseCase.forgetPwUc(mail)
      .then(() => {
        return;
      })
      .catch(() => {
        throw new Error();
      });
  },
};

const getters = {
  getUid: (state: State) => {
    return state.uid;
  },
  getUser: (state: State) => {
    return state.user;
  },

};

export default {
  state,
  mutations,
  actions,
  getters,
};
