<template>
  <navComponent></navComponent>
  <errDbComponent></errDbComponent>

  <div class="row g-3 small">
    <filterBuyInfoListComponent
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>リクなしのみ</template>
      <template #want>リクありのみ</template>
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
    <tbody v-for="val in filterbuyList" :key="val">
      <tr>
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
import errDbComponent from "./container/error-db.container.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    buyListComponent,
    filterBuyInfoListComponent,
    errDbComponent,
  },
  setup() {
    const buyInfoList = ref<BuyInfoList>();
    const activeCategory = ref("all");
    const filterStatus = ref<string>("all" || "no" || "want");
    const filterType = ref<Array<string>>(["all", "no", "want"]);
    const { categorys, uid } = commonMount();

    onMounted(async () => {
      buyInfoList.value = store.getters.getBuyInfoList;
    });

    const filterbuyList = computed((): BuyInfoList | null => {
      let result: BuyInfoList;

      if (buyInfoList.value == undefined) return null;

      if (activeCategory.value == "all") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.buyRequest == false;
          if (filterStatus.value == "want") return v.buyRequest == true;
          return null;
        });
        return result;
      } else {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (
            activeCategory.value == v.categoryId &&
            filterStatus.value == "all"
          )
            return v != null;
          if (
            activeCategory.value == v.categoryId &&
            filterStatus.value == "no"
          )
            return v.buyRequest == false;
          if (
            activeCategory.value == v.categoryId &&
            filterStatus.value == "want"
          )
            return v.buyRequest == true;
          return null;
        });
        return result;
      }
    });

    const changeBuyRequestDoUi = (request: boolean, buyInfoId: string) => {
      store.commit("changeBuyRequestDoStore", {
        buyInfoId,
        request,
        uid: uid.value,
      });
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
    };

    const onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    const changefilName = (name: string) => {
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
      filterType,
      filterbuyList,
      changefilName,
      uid,
    };
  },
});
</script>
