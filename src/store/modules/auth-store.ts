import { InjectionKey } from "vue";
import { Store } from "vuex";
import { AuthUseCase } from "../../model/auth.use-case";

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

const actions = {
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
  async userDeleteStore(context:{state:State}){
    return AuthUseCase.userDeleteUc().then(()=>{
      state.uid=""
      return
    }).catch(()=>{
      throw new Error()
    })
  },
  async forgetPwStore(context:{state:State},mail:string){
    return AuthUseCase.forgetPwUc(mail)
    .then(()=>{return})
    .catch(()=>{throw new Error})
  }
};

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
