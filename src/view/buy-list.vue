<template>
  <navComponent></navComponent>
  <div class="row g-3 small">
    <filterBuyInfoListContainer
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>ないのみ</template>
      <template #want>ほしいのみ</template>
    </filterBuyInfoListContainer>
  </div>

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
      <tr v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
        <buyListContainer
          :val="val"
          :index="index"
          @changeBuyRequestUi="changeBuyRequestUi"
          @changeItemNumUi="changeItemNumUi"
        ></buyListContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyListContainer
          :val="val"
          :index="index"
          @changeBuyRequestUi="changeBuyRequestUi"
          @changeItemNumUi="changeItemNumUi"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyListContainer from "./container/buy-list.container.vue";
import filterBuyInfoListContainer from "./container/filter-buyInfoList.container.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyListContainer,
    filterBuyInfoListContainer,
  },
  setup() {
    let buyInfoList = ref<BuyInfoList>();
    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();
    let filterStatus = ref<string>("all" || "no" || "want");
    let filterType = ref<Array<string>>();
    filterType.value = ["all", "no", "want"];

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      buyInfoList.value = store.getters.getItems;
      categorys.value = store.getters.getCategorys;
    });

    const filterbuyListRq = computed((): BuyInfoList | null => {
      let result: BuyInfoList;
      if (buyInfoList.value) {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.buyRequest == false;
          if (filterStatus.value == "want") return v.buyRequest == true;
          return null;
        });
        return result;
      } else {
        return null;
      }
    });

    const changeBuyRequestUi = (request: boolean, buyInfoId: string) => {
      store.commit("changeBuyRequestStore", {
        buyInfoId,
        request,
        uid,
      });
      buyInfoList.value = store.getters.getItems;
    };

    const changeItemNumUi = (itemNum: number, buyInfoId: string) => {
      store.commit("changeItemNumStore", { itemNum, buyInfoId, uid });
      buyInfoList.value = store.getters.getItems;
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let changefilName = (name: string) => {
      filterStatus.value = name;
    };

    return {
      buyInfoList,
      categorys,
      activeCategory,
      onActiveCategory,
      changeBuyRequestUi,
      changeItemNumUi,
      filterStatus,
      // filterName,
      filterType,
      filterbuyListRq,
      changefilName,
    };
  },
});
</script>
