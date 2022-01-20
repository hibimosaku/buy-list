<template>
  <ul
    class="nav nav-pills justify-content-center mb-2"
    style="margin: 20px 0 background-color: #e3f2fd;"
  >
    <li class="nav-item">
      <router-link
        to="/category"
        class="nav-link"
        :class="{ 'border-bottom border-primary': activeTab === 'category' }"
        >分類</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/item"
        class="nav-link"
        :class="{ 'border-bottom border-primary': activeTab === 'item' }"
        >品目</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/buyList"
        class="nav-link"
        :class="{ 'border-bottom border-primary': activeTab === 'buyList' }"
        >一覧</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/buyAct"
        class="nav-link"
        :class="{ 'border-bottom border-primary': activeTab === 'buyAct' }"
        >買物</router-link
      >
    </li>
  </ul>
</template>
<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    // const activeTab=ref<string>()
    const activeTab = computed(() => {
      if (useRoute().name === "category") {
        return "category";
      }
      if (useRoute().name === "item") {
        return "item";
      }

      if (useRoute().name === "buyList") {
        return "buyList";
      }

      if (useRoute().name === "buyAct") {
        return "buyAct";
      }

      return;
    });
    return {
      activeTab,
    };
  },
};
</script>
