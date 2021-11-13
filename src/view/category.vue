<template>
  <navComponent></navComponent>
  <h5>分類名</h5>
  <div
    v-for="(category, index) in categorys"
    :key="category.name"
    :index="index"
    class="mb-3"
  >
    <input
      class="form-control small"
      v-model="categorys[index].name"
      @change="changeCategoryUi(index, categorys[index].name)"
    />
    <div class="form-text text-danger"
      v-if="category.name.length>5"
    >分類名は5文字以内でお願いします</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.component.vue";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let { categorys, uid } = commonMount();

    let changeCategoryUi = (index: number, name: string) => {
      store.commit("changeCategoryStore", {
        name,
        id: index,
        uid: uid.value,
      })

      if(store.getters.getErrorChangeCategory){
        alert('登録に失敗しました')

      }
    };

    return {
      categorys,
      changeCategoryUi,
      uid,
    };
  },
});
</script>
