<template>
  <navComponent></navComponent>
  <tabComponent></tabComponent>
  <errDbComponent></errDbComponent>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navComponent from "./component/nav.component.vue";
import tabComponent from "./component/tab.component.vue";
import errDbComponent from "./container/error-db.container.vue";
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
