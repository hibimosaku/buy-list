<template>
  <div class="row g-3 small text-right">
    <filterBuyInfoListComponent
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>リクなしのみ</template>
      <template #want>リクありのみ</template>
    </filterBuyInfoListComponent>
  </div>

  <div class="text-right">
    <button class="btn btn-primary btn-sm" @click="resetBuyRequestUi">
      リセット
    </button>
    <button class="btn btn-primary btn-sm" @click="lineRequest">
      買物依頼Line
    </button>
  </div>
  <input
    class="form-control form-control-sm me-2"
    v-model="search"
    type="search"
    style="margin-bottom: 10px"
    placeholder="文字入力で検索できます"
  />
  {{ resultMessage }}
  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">購入日</th>
        <th scope="col" colspan="2">リクエスト</th>
        <!-- <th scope="col">ほしい</th> -->
        <th scope="col">個数</th>
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
// import { useStore } from 'vuex'

import categoryComponent from "../category/category-list.component.vue";
import buyListComponent from "./buy-list.component.vue";
import filterBuyInfoListComponent from "./filter-buyInfoList.component.vue";
import errDbComponent from "../common/error-db.container.vue";

import { store } from "../../store/store"

import { commonMount } from "../common/common-mount";
import { Line } from "../../model/line.use.case";
import { useFilterBuyList } from "./useFilterBuyList";
import { ID } from "../../model/id.value";

export default defineComponent({
  components: {
    categoryComponent,
    buyListComponent,
    filterBuyInfoListComponent,
    errDbComponent,
  },
  setup() {
    // const store = useStore()

    const filterType = ref<Array<string>>(["all", "no", "want"]);
    const { buyInfoList, filterbuyList, search, activeCategory, filterStatus } =
      useFilterBuyList();
    const { categorys, uid } = commonMount();

    onMounted(() => {
      buyInfoList.value = store.getters.getBuyInfoList;
    });

    const resultMessage = computed(() => {
      if (search.value === "") return null;
      if (!filterbuyList.value) return null;
      if (search.value !== "" && filterbuyList.value.length > 0) {
        return `検索結果：${filterbuyList.value.length}件該当`;
      }
      if (search.value !== "" && filterbuyList.value.length === 0) {
        return "検索結果：該当なし";
      }
      return null;
    });

    const changeBuyRequestDoUi = (request: boolean, buyInfoId: ID) => {
      store.dispatch("changeBuyRequestDoStore", {
        buyInfoId,
        request,
        uid: uid.value,
      });
    };

    const changeBuyRequestNumUi = (buyRequestNum: number, buyInfoId: ID) => {
      store.dispatch("changeBuyRequestNumStore", {
        buyRequestNum,
        buyInfoId,
        uid: uid.value,
      });
    };

    const resetBuyRequestUi = () => {
      store.dispatch("resetBuyRequestStore", {
        id: activeCategory.value,
        uid: uid.value,
      });
    };

    const onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    const changefilName = (name: string) => {
      filterStatus.value = name;
    };

    const lineRequest = async () => {
      Line.lineRequest();
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
      search,
      resetBuyRequestUi,
      lineRequest,
      resultMessage,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and(max-height:670px) and(max-width:420px) {
  table {
    display: block;
    overflow-y: scroll;
    height: 400px;
  }
  table thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
  }
}
</style>
