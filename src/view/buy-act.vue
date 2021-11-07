<template>
  <navComponent></navComponent>
  <div class="row g-3 small">
    <filterBuyInfoListContainer
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>買うのみ</template>
      <template #want>ないのみ</template>
    </filterBuyInfoListContainer>

    <div class="dropdown col-3">
      <button
        class="btn btn-info btn-sm dropdown-toggle col-md-6"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        リセット
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a
            class="dropdown-item small"
            @click="resetBuyStatusUi(activeCategory)"
            >すべて</a
          >
        </li>
        <li>
          <a
            class="dropdown-item small"
            @click="resetBuyStatusUi(activeCategory)"
            >選択の分類のみ</a
          >
        </li>
      </ul>
    </div>
  </div>
  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">個数</th>
        <th scope="col">買う</th>
        <th scope="col">ない</th>
      </tr>
    </thead>
    <tbody v-if="activeCategory === 'all'">
      <tr v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
        <buyActContainer
          :val="val"
          :index="index"
          @changeBuyResultUi="changeBuyResultUi"
        ></buyActContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyActContainer
          :val="val"
          :index="index"
          @changeBuyResultUi="changeBuyResultUi"
        ></buyActContainer>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-success btn-block" type="button" @click="buyFinUi">
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
import { computed, defineComponent, onMounted, ref } from "vue";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyActContainer from "./container/buy-act.container.vue";
import filterBuyInfoListContainer from "./container/filter-buyInfoList.container.vue";

import { store } from "../store/store";
import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyActContainer,
    filterBuyInfoListContainer,
  },
  setup() {
    let buyInfoList = ref<BuyInfoList>();
    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();
    let filterStatus = ref<string>("all" || "buy" || "no");

    let filterType = ref<Array<string>>();
    filterType.value = ["all", "buy", "no"];

    let changefilName = (name: string) => {
      filterStatus.value = name;
    };

    filterStatus.value = "all";
    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      categorys.value = await store.getters.getCategorys;
      buyInfoList.value = store.getters.getBuyStatusItems;
    });

    const filterbuyListRq = computed((): BuyInfoList | null => {
      let result: BuyInfoList;
      if (buyInfoList.value) {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.buyResult == false;
          if (filterStatus.value == "buy") return v.buyResult == true;
          return null;
        });
        return result;
      } else {
        return null;
      }
    });

    let changeBuyResultUi = (buyResult: boolean, buyInfoId: string) => {
      if (buyInfoList.value) {
        // buyInfoList.value[index].buyResult = buyResult;
        store.commit("changeBuyResultStore", {
          buyResult,
          buyInfoId,
          uid,
        });
        buyInfoList.value = store.getters.getBuyStatusItems;
      }
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let buyFinUi = () => {
      store.commit("buyFinStore", {
        buyInfoList: buyInfoList.value,
        uid: uid,
      });
      buyInfoList.value = store.getters.getBuyStatusItems;
    };

    let resetBuyStatusUi = (categoryId: string) => {
      store.commit("resetBuyStatusStore", {
        id: categoryId,
      });
      buyInfoList.value = store.getters.getBuyStatusItems;
    };

    return {
      buyInfoList,
      categorys,
      buyFinUi,
      activeCategory,
      onActiveCategory,
      changeBuyResultUi,
      filterStatus,
      filterbuyListRq,
      resetBuyStatusUi,
      changefilName,
      filterType,
    };
  },
});
</script>
