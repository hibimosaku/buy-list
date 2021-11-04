<template>
  <navComponent></navComponent>
  <button type="button" class="btn btn-success btn-sm" @click="wantOrder">
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
      <tr v-for="(val, index) in BuyInfoList" :key="val" :index="index">
        <buyListContainer
          :val="val"
          :index="index"
          @changeBuyRequest="changeBuyRequest"
          @changeItemNum="changeItemNum"
        ></buyListContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in BuyInfoList" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyListContainer
          :val="val"
          :index="index"
          @changeBuyRequest="changeBuyRequest"
          @changeItemNum="changeItemNum"
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

import { BuyInfoList, BuyInfo } from "../model/buy-info.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyListContainer,
  },
  setup() {
    let BuyInfoList = ref<BuyInfoList>();
    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      BuyInfoList.value = store.getters.getItems;
      categorys.value = store.getters.getCategorys;
      console.log(categorys);
    });

    let changeBuyRequest = (status: boolean, itemId: string) => {
      store.commit("changeBuyRequest", {
        itemId,
        status,
        uid,
      });
      BuyInfoList.value = store.getters.getItems;
    };

    let changeItemNum = (itemNum: number, val: BuyInfo, index: number) => {
      store.commit("changeItemNum", { itemNum, val, index, uid });
      BuyInfoList.value = store.getters.getItems;
    };

    const wantOrder = () => {
      if (BuyInfoList.value) {
        BuyInfo.buyRequestWantOrder(BuyInfoList.value);
      } else {
        alert("データが登録さてれいません");
      }
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    return {
      BuyInfoList,
      categorys,
      wantOrder,
      // priceOrderBig,
      activeCategory,
      onActiveCategory,
      changeBuyRequest,
      changeItemNum,
    };
  },
});
</script>
