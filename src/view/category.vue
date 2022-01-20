<template>
  <p>品目を分類ごとで利用したい場合、登録お願いします。</p>
  <!-- <transition-group name="fade"> -->
  <div
    v-for="(category, index) in categorys"
    :key="category.name"
    :index="index"
    class="mb-1"
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
  <!-- </transition-group> -->
</template>
<script lang="ts">
// import "./style.scss";
import "../../assets/css/style.scss";
import { defineComponent, onMounted } from "vue";
import { store } from "../store/store";

import { commonMount } from "./func/common-mount";
import { useRouter } from "vue-router";

// import axios from "axios"

export default defineComponent({
  setup() {
    const { categorys, uid } = commonMount();
    const router = useRouter();

    onMounted(() => {});
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
      router,
    };
  },
});
</script>
<style lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s ease;
}
.fade-enter-to {
  opacity: 1;
}
</style>
