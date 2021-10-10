<template>
  <button v-on:click="login">login</button>
  <button v-on:click="read">read</button>
  <button v-on:click="register">register</button>
  <br />
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">分類名</label>
    <input type="text" class="form-control" v-model="categoryName" />
  </div>
  <button
    type="button"
    class="btn btn btn-primary btn-lg"
    v-on:click="registerCategory"
  >
    変更
  </button>
  {{ categorys }}
  <div
    class="btn-group"
    role="group"
    aria-label="Basic example"
    v-for="category in categorys"
    :key="category"
  >
    <button type="button" class="btn btn-primary">{{ category.name }}</button>
  </div>
  <br />
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">品目名</label>
    <input type="text" class="form-control" v-model="itemName" />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">価格</label>
    <input type="text" class="form-control" v-model="itemPrice" />
  </div>
  <button
    type="button"
    class="btn btn btn-primary btn-lg"
    v-on:click="registerItem"
  >
    新規登録
  </button>
  {{ items }}

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">名前</th>
        <th scope="col">価格</th>
        <!-- <th scope="col">Handle</th> -->
      </tr>
    </thead>
    <tbody v-for="item in items" :key="item.id">
      <tr>
        <th scope="row">{{ item.id }}</th>
        <td>
          <input
            v-model="item.name"
            v-on:change="updateItem(item.id, item.name)"
          />
        </td>
        <td>{{ item.price }}</td>
        <!-- <button type="button" class="btn btn btn-primary btn-lg" v-on:click="updateItem(item.id)">test</button> -->
      </tr>
    </tbody>
  </table>

  <div class="container">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary">Left</button>
      <button type="button" class="btn btn-outline-primary">Middle</button>
      <button type="button" class="btn btn-outline-primary">Right</button>
      <button type="button" class="btn btn-outline-primary">Right</button>
      <button type="button" class="btn btn-outline-primary">Right</button>
    </div>
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary btn-lg">Left</button>
      <button type="button" class="btn btn-outline-primary btn-lg">
        Middle
      </button>
      <button type="button" class="btn btn-outline-primary btn-lg">
        Right
      </button>
      <button type="button" class="btn btn-outline-primary btn-lg">
        Right
      </button>
      <button type="button" class="btn btn-outline-primary btn-lg">
        Right
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, ref } from "vue";
// import { initializeApp } from "firebase/app";
import { AuthRepository } from "../model/auth.repository";
import { ItemRepository } from "../model/item.repository";
// import { saveCategoryUc } from "../model/category.use-case"
import { saveItemUc } from "../model/item.use-case";
import { useStore } from "vuex";
import { key } from "../store/store";

// import * as admin from 'firebase-admin';

export default defineComponent({
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

    // CategoryRepository.getCategory("userID").then(value=>{
    //   categorys.value=value
    // })
    const start = async () => {
      try {
        await store.dispatch("login", "userID").then((value) => {
          console.log("成功");
        });
      } catch (e) {
        console.log("start is failure", e);
      }
    };
    start().then((value) => {
      console.log("成功2");
      //最初、ここで、categorys.value= store.getters.getCategorys→失敗
    });

    onBeforeUpdate(() => {
      categorys.value = store.getters.getCategorys;
    });

    // ItemRepository.getItem("userID").then(value=>{
    //   items.value=value
    // })

    let registerItem = () => {
      saveItemUc(itemName.value, itemPrice.value);
      alert("新規登録完了");
    };
    let updateItem = (a: any, b: any) => {
      console.log(items.value, a, b);
      // console.log(items.value[a].name,b)
      // console.log(a,b)
      // saveItemUc()
    };

    // let updateItem = ()=>{
    //   saveItemUc(itemName.value,itemPrice.value,id)
    //   alert('登録完了')
    // }

    let get = () => {
      // ItemRepository.getItem("userID").then(value=>{
      //   items.value=value
      // })
    };

    return {
      items,
      login,
      register,
      registerItem,
      itemName,
      itemPrice,
      get,
      updateItem,
      // registerCategory,
      categoryName,
      categorys,
    };
  },
});
</script>
