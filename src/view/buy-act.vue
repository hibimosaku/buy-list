<template>
  <navComponent></navComponent>
  <div class="row g-3 small">
    <filterBuyInfoListComponent
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>買うのみ</template>
      <template #want>ないのみ</template>
    </filterBuyInfoListComponent>

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
        <buyActComponent
          :val="val"
          @changeBuyResultUi="changeBuyResultUi"
        ></buyActComponent>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyActComponent
          :val="val"
          @changeBuyResultUi="changeBuyResultUi"
        ></buyActComponent>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-success btn-block" type="button" @click="buyFinUi">
    購入完了
  </button>

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
import buyActComponent from "./component/buy-act.component.vue";
import filterBuyInfoListComponent from "./component/filter-buyInfoList.component.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    buyActComponent,
    filterBuyInfoListComponent,
  },
  setup() {
    let buyInfoList = ref<BuyInfoList>();
    let activeCategory = ref();
    let filterStatus = ref<string>("all" || "buy" || "no");
    let { categorys, uid } = commonMount();

    let filterType = ref<Array<string>>();
    filterType.value = ["all", "buy", "no"];

    let changefilName = (name: string) => {
      filterStatus.value = name;
    };

    filterStatus.value = "all";
    activeCategory.value = "all";

    onMounted(async () => {
      buyInfoList.value = store.getters.getBuyResultList;
    });

    const filterbuyListRq = computed((): BuyInfoList | null => {
      let result: BuyInfoList;
      if (buyInfoList.value) {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.buyResultDo == false;
          if (filterStatus.value == "buy") return v.buyResultDo == true;
          return null;
        });
        return result;
      } else {
        return null;
      }
    });

    let changeBuyResultUi = (buyResultDo: boolean, buyInfoId: string) => {
      if (buyInfoList.value) {
        console.log();
        // buyInfoList.value[index].buyResultDo = buyResultDo;
        store.commit("changeBuyResultStore", {
          buyResultDo,
          buyInfoId,
          uid: uid.value,
        });
        buyInfoList.value = store.getters.getBuyResultList;
      }
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let buyFinUi = () => {
      store.commit("buyFinStore", {
        buyInfoList: buyInfoList.value,
        uid: uid.value,
      });
      buyInfoList.value = store.getters.getBuyResultList;
    };

    let resetBuyStatusUi = (categoryId: string) => {
      store.commit("resetBuyRequestDoStore", {
        id: categoryId,
      });
      buyInfoList.value = store.getters.getBuyResultList;
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
      uid,
    };
  },
});
</script>
