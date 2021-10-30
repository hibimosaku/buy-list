<template>
  <navComponent></navComponent>
  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">買う</th>
        <th scope="col">ない</th>
      </tr>
    </thead>
    <tbody v-if="activeCategory === 'all'">
      <tr v-for="(val, index) in buyListRq" :key="val" :index="index">
        <buyRequestContainer
          :val="val"
          :index="index"
          @changeBuyStatus="changeBuyStatus"
        ></buyRequestContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in buyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyRequestContainer
          :val="val"
          :index="index"
          @changeBuyStatus="changeBuyStatus"
        ></buyRequestContainer>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-success btn-block" type="button" @click="buyFin">
    購入完了
  </button>

  <categoryContainer
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyRequestContainer from "./container/buy-request.container.vue";

import { store } from "../store/store";
import { ItemList, SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyRequestContainer,
  },
  setup() {
    let buyListRq = ref<ItemList>();
    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      categorys.value = await store.getters.getCategorys;
      buyListRq.value = await store.getters.getBuyStatusItems;
    });

    let changeBuyStatus = (
      status: boolean,
      index: number,
      val: SingleItemList
    ) => {
      if (buyListRq.value) {
        buyListRq.value[index].buyStatus = status;
        store.commit("changeBuyStatus", {
          status,
          val,
        });
      }
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let buyFin = () => {
      store.commit("buyFin", {
        val: buyListRq.value,
        userId: uid,
      });
      buyListRq.value = store.getters.getBuyStatusItems;
    };

    return {
      buyListRq,
      categorys,
      buyFin,
      activeCategory,
      onActiveCategory,
      changeBuyStatus,
    };
  },
});
</script>
