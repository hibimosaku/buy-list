<template>
  <div class="row g-3 small text-right">
    <filterBuyInfoListComponent
      :filterType="filterType"
      @changefilName="changefilName"
    >
      <template #all>すべて</template>
      <template #no>買うのみ</template>
      <template #want>ないのみ</template>
    </filterBuyInfoListComponent>
  </div>

  <div class="text-right">
    <button class="btn btn-primary btn-sm" @click="resetBuyResultUi">リセット</button>
    <button class="btn btn-primary btn-sm" @click="resetBuyResultUi">買物完了Line</button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">個数</th>
        <th scope="col">買う</th>
        <th scope="col">ない</th>
      </tr>
    </thead>
    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr>
        <buyActComponent
          :val="val"
          @changeBuyResultUi="changeBuyResultUi"
        ></buyActComponent>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-primary btn-block" type="button" @click="buyFinUi">
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
import errDbComponent from "./container/error-db.container.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    buyActComponent,
    filterBuyInfoListComponent,
    errDbComponent,
  },
  setup() {
    const buyInfoList = ref<BuyInfoList>();
    const activeCategory = ref();
    const filterStatus = ref<string>("all" || "buy" || "no");
    const { categorys, uid } = commonMount();
    const filterType = ref<Array<string>>();
    filterType.value = ["all", "buy", "no"];

    const changefilName = (name: string) => {
      filterStatus.value = name;
    };

    filterStatus.value = "all";
    activeCategory.value = "all";

    onMounted(async () => {
      buyInfoList.value = store.getters.getBuyResultList;
    });

    const filterbuyListRq = computed((): BuyInfoList | null => {
      let result: BuyInfoList;

      if (buyInfoList.value === undefined) return null;
      if (activeCategory.value === "all") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value === "all") return v != null;
          if (filterStatus.value === "no") return v.buyResult === false;
          if (filterStatus.value === "buy") return v.buyResult === true;
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
            return v.buyResult == false;
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "buy"
          )
            return v.buyResult === true;
          return null;
        });
        return result;
      }
    });

    const changeBuyResultUi = (buyResult: boolean, buyInfoId: string) => {
      if (buyInfoList.value) {
        store.commit("changeBuyResultStore", {
          buyResult,
          buyInfoId,
          uid: uid.value,
        });
      }
    };

    const onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    const buyFinUi = () => {
      store.dispatch("buyFinStore", {
        buyInfoList: buyInfoList.value,
        uid: uid.value,
      }).then(()=>{
        buyInfoList.value = store.getters.getBuyResultList;
        alert('更新しました')
      })
      .catch(()=>{

      })
    };

    const resetBuyResultUi = () => {
      store.commit("resetBuyResultStore", {
        id: activeCategory.value,
        uid: uid.value,
      });
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
      resetBuyResultUi,
      changefilName,
      filterType,
      uid,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and(max-height:670px)and(max-width:420px){
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

