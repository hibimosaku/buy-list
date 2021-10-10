<template>
  <navComponent></navComponent>
  <hr />
  <div
    v-for="(category, index) in categorys"
    :key="category.name"
    :index="index"
  >
    <input
      v-model="categorys[index].name"
      v-on:change="changeCategory(index)"
    />
  </div>
  {{ categorys }}
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navComponent from "../component/nav.vue";
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
  emits: ["item"],
  setup() {
    let store = useStore(key);
    let categorys = ref();

    onMounted(() => {
      categorys.value = store.getters.getCategorys;
    });
    let changeCategory = (index: any) => {
      store.commit("changeCategory", [categorys.value[index], index, "userID"]);
    };

    return {
      categorys,
      changeCategory,
    };
  },
});
</script>
