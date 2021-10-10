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
import { saveItemUc } from "../model/item.use-case";
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let store = useStore(key);
    // console.log(store.state.categorys)

    const login = () => {
      AuthRepository.signIn();
    };
    const register = () => {
      AuthRepository.signUp();
    };

    let categoryName = ref();
    let categorys = ref();

    // let registerCategory=()=>{
    //   saveCategoryUc(categoryName.value,"1")
    // }

    let itemName = ref();
    let itemPrice = ref();
    let items = ref();

    const start = () => {
      try {
        store.dispatch("startCategory", "userID");
        // await startItem()
      } catch (e) {
        console.log("start is failure", e);
      }
    };
    start();
    // start().then((value) => {
    //   console.log("成功");
    //   //最初、ここで、categorys.value= store.getters.getCategorys→失敗
    // });

    // ItemRepository.getItem("userID").then(value=>{
    //   console.log('test')
    //   items.value=value
    // })
    // console.log('test',startItem())

    // let registerItem = () => {
    //   saveItemUc(itemName.value, itemPrice.value);
    //   alert("新規登録完了");
    // };
    // let updateItem = (a: any, b: any) => {
    //   console.log(items.value, a, b);
    // };

    // let updateItem = ()=>{
    //   saveItemUc(itemName.value,itemPrice.value,id)
    //   alert('登録完了')
    // }

    // let get = ()=>{
    //   ItemRepository.getItem("userID").then(value=>{
    //     items.value=value
    //   })
    // }

    return {
      items,
      login,
      register,
      // registerItem,
      itemName,
      itemPrice,
      // get,
      // updateItem,
      // registerCategory,
      categoryName,
      categorys,
    };
  },
});
</script>
