<template>
  <navComponent></navComponent>
  <div class="row g-3 small">
    <div class="col-9">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          @click="filterStatus = 'all'"
          checked
        />
        <label class="form-check-label" for="flexRadioDefault1"> すべて </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          @click="filterStatus = 'buy'"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          買うのみ
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          @click="filterStatus = 'no'"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          ないのみ
        </label>
      </div>
    </div>
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
          <a class="dropdown-item small" @click="resetBuyStatus(activeCategory)"
            >すべて</a
          >
        </li>
        <li>
          <a class="dropdown-item small" @click="resetBuyStatus(activeCategory)"
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
          @changeBuyResult="changeBuyResult"
        ></buyActContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyActContainer
          :val="val"
          :index="index"
          @changeBuyResult="changeBuyResult"
        ></buyActContainer>
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
import { computed, defineComponent, onMounted, ref } from "vue";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyActContainer from "./container/buy-act.container.vue";

import { store } from "../store/store";
import { BuyInfoList, BuyInfo } from "../model/buy-info.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyActContainer,
  },
  setup() {
    let buyListRq = ref<BuyInfoList>();

    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();
    let filterStatus = ref<string>("all" || "buy" || "no");
    filterStatus.value = "all";

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      categorys.value = await store.getters.getCategorys;
      buyListRq.value = store.getters.getBuyStatusItems;
    });

    const filterbuyListRq = computed((): BuyInfoList | null => {
      let result: BuyInfoList;
      if (buyListRq.value) {
        result = buyListRq.value.filter((v: any) => {
          if (filterStatus.value == "all") return v != null;
          if (filterStatus.value == "no") return v.BuyResult == false;
          if (filterStatus.value == "buy") return v.BuyResult == true;
          return null;
        });
        return result;
      } else {
        return null;
      }
    });

    let changeBuyResult = (status: boolean, index: number, val: BuyInfo) => {
      if (buyListRq.value) {
        buyListRq.value[index].buyResult = status;
        store.commit("changeBuyResult", {
          status,
          val,
          uid,
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

    let resetBuyStatus = (categoryId: string) => {
      store.commit("resetBuyStatus", {
        id: categoryId,
      });
      buyListRq.value = store.getters.getBuyStatusItems;
    };

    return {
      buyListRq,
      categorys,
      buyFin,
      activeCategory,
      onActiveCategory,
      changeBuyResult,
      filterStatus,
      filterbuyListRq,
      resetBuyStatus,
    };
  },
});
</script>
