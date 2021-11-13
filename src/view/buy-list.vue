<template>
  <navComponent></navComponent>
  <div class="row g-3 small">
    <filterBuyInfoListComponent
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>ないのみ</template>
      <template #want>ほしいのみ</template>
    </filterBuyInfoListComponent>
  </div>

  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col" style="font-size: 10px">価格</th>
        <th scope="col" style="font-size: 10px">購入日</th>
        <th scope="col" colspan="2">リクエスト</th>
        <!-- <th scope="col">ほしい</th> -->
        <th scope="col" style="font-size: 10px">個数</th>
      </tr>
    </thead>
    <tbody v-if="activeCategory === 'all'">
      <tr v-for="val in filterbuyList" :key="val">
        <buyListComponent
          :val="val"
          @changeBuyRequestDoUi="changeBuyRequestDoUi"
          @changeBuyRequestNumUi="changeBuyRequestNumUi"
        ></buyListComponent>
      </tr>
    </tbody>

    <tbody v-for="val in filterbuyList" :key="val">
      <tr v-if="activeCategory == val.categoryId">
        <buyListComponent
          :val="val"
          @changeBuyRequestDoUi="changeBuyRequestDoUi"
          @changeBuyRequestNumUi="changeBuyRequestNumUi"
        ></buyListComponent>
      </tr>
    </tbody>
  </table>
  <categoryComponent
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.component.vue";
import categoryComponent from "./component/category-list.component.vue";
import buyListComponent from "./component/buy-list.component.vue";
import filterBuyInfoListComponent from "./component/filter-buyInfoList.component.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    buyListComponent,
    filterBuyInfoListComponent,
  },
  setup() {
    let buyInfoList = ref<BuyInfoList>();
    let activeCategory = ref();
    let filterStatus = ref<string>("all" || "no" || "want");
    let filterType = ref<Array<string>>();
    filterType.value = ["all", "no", "want"];
    let { categorys, uid } = commonMount();

    activeCategory.value = "all";

    onMounted(async () => {
      buyInfoList.value = store.getters.getBuyInfoList;
    });

    const filterbuyList = computed((): BuyInfoList | null => {
      let result: BuyInfoList;
      if (buyInfoList.value) {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.buyRequestDo == false;
          if (filterStatus.value == "want") return v.buyRequestDo == true;
          return null;
        });
        return result;
      } else {
        return null;
      }
    });

    const changeBuyRequestDoUi = (request: boolean, buyInfoId: string) => {
      store.commit("changeBuyRequestDoStore", {
        buyInfoId,
        request,
        uid: uid.value,
      });
      buyInfoList.value = store.getters.getBuyInfoList;
    };

    const changeBuyRequestNumUi = (
      buyRequestNum: number,
      buyInfoId: string
    ) => {
      store.commit("changeBuyRequestNumStore", {
        buyRequestNum,
        buyInfoId,
        uid,
      });
      buyInfoList.value = store.getters.getBuyInfoList;
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
      changeBuyRequestDoUi,
      changeBuyRequestNumUi,
      filterStatus,
      // filterName,
      filterType,
      filterbuyList,
      changefilName,
      uid,
    };
  },
});
</script>
