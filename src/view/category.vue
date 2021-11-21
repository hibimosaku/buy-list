<template>
  <navComponent></navComponent>
  <errDbComponent></errDbComponent>

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
    <div class="form-text text-danger" v-if="category.name.length > 4">
      分類名は4文字以内でお願いします
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.component.vue";
import errDbComponent from "./container/error-db.container.vue";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    errDbComponent,
  },
  setup() {
    const { categorys, uid } = commonMount();

    const changeCategoryUi = (index: number, name: string) => {
      if (name.length > 4) {
        return;
      } else {
        store.commit("changeCategoryStore", {
          name,
          id: index,
          uid: uid.value,
        });
      }
    };

    return {
      categorys,
      changeCategoryUi,
      uid,
      // isErrCategory,
    };
  },
});
</script>
<style scoped>
/* h5{
  font-size:30px;
} */
</style>
