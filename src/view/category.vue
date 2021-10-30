<template>
  <navComponent></navComponent>
  <h5>分類名</h5>
  <div
    v-for="(category, index) in categorys"
    :key="category.name"
    :index="index"
    class="input-group"
  >
    <input
      class="form-control"
      v-model="categorys[index].name"
      @change="changeCategory(index, categorys[index].name)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";

import navComponent from "./component/nav.vue";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let store = useStore(key);

    let categorys = ref();
    let uid: string;

    onMounted(() => {
      uid = store.getters.getUid;
      categorys.value = store.getters.getCategorys;
    });

    let changeCategory = (index: number, name: string) => {
      store.commit("changeCategory", {
        name,
        id: index,
        userId: String(uid),
      });
    };

    return {
      categorys,
      changeCategory,
    };
  },
});
</script>
