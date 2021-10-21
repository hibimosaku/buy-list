<template>
  <navComponent></navComponent>
  <div
    v-for="(category, index) in categorys"
    :key="category.name"
    :index="index"
  >
    <input
      v-model="categorys[index].name"
      v-on:change="changeCategory(index, categorys[index].name)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navComponent from "./component/nav.vue";
import { useStore } from "vuex";
import { key } from "../store/store";
import { Category } from "../model/category.model";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    let store = useStore(key);
    let categorys = ref<Category>();
    let aaa=ref()

    onMounted(() => {
categorys.value = {...store.getters.getCategorys};
localStorage.setItem('set',JSON.stringify(categorys.value))

// categorys.value=JSON.parse(localStorage.getItem('set'))




    });
    let changeCategory = (index: string, name: string) => {
      store.commit("changeCategory", {
        name,
        id: index,
        userId: "userID",
      });
    };

    return {
      categorys,
      changeCategory,
      aaa
    };
  },
});
</script>
