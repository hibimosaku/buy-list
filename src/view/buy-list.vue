<template>
  <navComponent></navComponent>
  <!-- <button type="button" class="btn btn-info" @click="priceOrderBig">
    金額順(大）
  </button> -->
  <button type="button" class="btn btn-info" @click="wantOrder">
    ほしい順
  </button>

  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col" style="font-size: 10px">価格</th>
        <th scope="col" style="font-size: 10px">購入日</th>
        <th scope="col">ない</th>
        <th scope="col">ほしい</th>
        <th scope="col" style="font-size: 10px">個数</th>
      </tr>
    </thead>
    <tbody v-if="activeCategory === 'all'">
      <tr v-for="(val, index) in itemList" :key="val" :index="index">
        <buyListContainer
          :val="val"
          :index="index"
          @changeItemStatus="changeItemStatus"
        ></buyListContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in itemList" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyListContainer
          :val="val"
          :index="index"
          @changeItemStatus="changeItemStatus"
        ></buyListContainer>
      </tr>
    </tbody>
  </table>
  <categoryContainer
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyListContainer from "./container/buy-list.container.vue";

import { ItemList, SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyListContainer,
  },
  setup() {
    let itemList = ref<ItemList>();
    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      itemList.value = store.getters.getItems;
      categorys.value = store.getters.getCategorys;
    });

    let changeItemStatus = (
      status: boolean,
      val: SingleItemList,
      index: number
    ) => {
      store.commit("changeItemStatus", {
        val,
        status,
        index,
        userId: uid,
      });
      itemList.value = store.getters.getItems;
    };

    const wantOrder = () => {
      if (itemList.value) {
        ItemList.itemStatusWantOrder(itemList.value);
      } else {
        alert("データが登録さてれいません");
      }
    };

    // const priceOrderBig = () => {
    //   if (itemList.value) {
    //     itemList.value.sort((first, second) => {
    //       if (first.item.price > second.item.price) {
    //         return -1;
    //       } else if (first.item.price < second.item.price) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     });
    //   }
    // };
    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    return {
      itemList,
      categorys,
      wantOrder,
      // priceOrderBig,
      activeCategory,
      onActiveCategory,
      changeItemStatus,
    };
  },
});
</script>
