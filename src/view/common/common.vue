<template>
  <navComponent></navComponent>
  <tabComponent></tabComponent>
  <errDbComponent></errDbComponent>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navComponent from "../common/nav.component.vue";
import tabComponent from "../common/tab.component.vue";
import errDbComponent from "./error-db.container.vue";
// import Item from "./item.vue";
// import Category from "./category.vue";

export default defineComponent({
  components: {
    tabComponent,
    navComponent,
    errDbComponent,
  },
  setup() {
    return {};
  },
});
</script>
<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 2s ease;
}
.fade-enter-to {
  opacity: 1;
}
</style>
