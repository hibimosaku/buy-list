<template>
  <navComponent></navComponent>
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">メールアドレス</label>
      <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="mail">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">パスワード</label>
      <input type="password" class="form-control form-control-sm" id="exampleInputPassword1" v-model="pw">
    </div>
    <button type="submit" class="btn btn-primary" @click="login">ログイン</button>
  </form>
</template>

<script lang="ts">
import navComponent from "./component/nav.vue";
import { defineComponent, ref } from "vue";
import { AuthRepository } from "../model/auth.repository";
import { useStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { key } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let store = useStore(key);
    let mail=ref<string>()
    let pw=ref<string>()
    const auth = getAuth();

    const login = () => {
      if(mail.value && pw.value){
      AuthRepository.signIn(mail.value,pw.value);
      }
    };

    const register = () => {
      AuthRepository.signUp();
    };


    const start = () => {
      try {
        store.dispatch("startCategory", "userID");
        store.dispatch("startItems", "userID");
      } catch (e) {
        console.log("start is failure", e);
      }
    };
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    start();


      const uid = user.uid;
      console.log('login',uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
    });


    return {
      login,
      register,
      mail,
      pw
    };
  },
});
</script>
