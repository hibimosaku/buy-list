<template>
  <navComponent></navComponent>

  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">購入日</th>
        <th scope="col colspan=2">状態</th>
      </tr>
    </thead>
    <tbody v-if="active_all === true">
      <tr v-for="(val, index) in itemList" :key="val" :index="index">
        <buyListContainer
          :val="val"
          :index="index"
          v-on:changeItemStatusNo="changeItemStatusNo"
          v-on:changeItemStatusWant="changeItemStatusWant"
        ></buyListContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in itemList" :key="val" :index="index">
      <tr v-if="active_tab == val.categoryId">
        <buyListContainer
          :val="val"
          :index="index"
          v-on:changeItemStatusNo="changeItemStatusNo"
          v-on:changeItemStatusWant="changeItemStatusWant"
        ></buyListContainer>
      </tr>
    </tbody>
  </table>
  <categoryContainer
    v-if="categorys"
    :propsStore="categorys"
    v-on:propsActiveCategory="activeCategory"
    v-on:propsActiveCategoryAll="activeAll"
  ></categoryContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyListContainer from "./container/buy-list.container.vue"
import { store } from "../store/store";
import { ItemList, SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyListContainer
  },
  setup() {
    let itemList = ref<ItemList>();
    let active_tab = ref<string | null>();
    let active_all = ref<boolean | null>();

    active_all.value = true;

    let categorys = ref<Array<string> | null>();
    onMounted(() => {
      categorys.value = store.getters.getCategorys;
      itemList.value = store.getters.getItems;
    });
    let changeItemStatusNo = (val: SingleItemList, index: string) => {
      store.dispatch("changeItemStatus", {
        val,
        status: false,
        index,
        userId: "userID",
      });
    };
    let changeItemStatusWant = (val: SingleItemList, index: string) => {
      store.dispatch("changeItemStatus", {
        val,
        status: true,
        index,
        userId: "userID",
      });
    };
    let activeCategory = (id: string) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };

    return {
      active_tab,
      active_all,
      itemList,
      categorys,
      changeItemStatusNo,
      changeItemStatusWant,
      activeAll,
      activeCategory,
    };
  },
});
</script>
