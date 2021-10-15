<template>
  <navComponent></navComponent>
  ここで対象ユーザの全データを取得。最終的に、買い物リストがログイン後の最初の画面になる予定
</template>
<script lang="ts">
import navComponent from "../component/nav.vue";
import { defineComponent, ref } from "vue";
// import { initializeApp } from "firebase/app";
import { AuthRepository } from "../model/auth.repository";
// import { saveCategoryUc } from "../model/category.use-case"
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let store = useStore(key);

    const login = () => {
      AuthRepository.signIn();
    };
    const register = () => {
      AuthRepository.signUp();
    };

    let categoryName = ref();
    let categorys = ref();


    let itemName = ref();
    let itemPrice = ref();
    let items = ref();

    const start = () => {
      try {
        store.dispatch("startCategory", "userID");
        store.dispatch("startItems", "userID");
      } catch (e) {
        console.log("start is failure", e);
      }
    };
    start();

    return {
      items,
      login,
      register,
      itemName,
      itemPrice,
      categoryName,
      categorys,
    };
  },
});
</script>
