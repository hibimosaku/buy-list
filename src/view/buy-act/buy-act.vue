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
    <button class="btn btn-primary btn-sm" @click="resetBuyResultUi">
      リセット
    </button>
    <button class="btn btn-primary btn-sm" @click="resetBuyResultUi">
      買物完了Line
    </button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col" style="width: 40%">品目名</th>
        <th scope="col" style="width: 20%">価格</th>
        <th scope="col" style="width: 20%">個数</th>
        <th scope="col" style="width: 10%">買う</th>
        <th scope="col" style="width: 10%">ない</th>
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
import { defineComponent, onMounted, ref } from "vue";
// import { useStore } from 'vuex'
import { store } from "../../store/store"

import navComponent from "../common/nav.component.vue";
import categoryComponent from "../category/category-list.component.vue";
import buyActComponent from "./buy-act.container.vue";
import filterBuyInfoListComponent from "../buy-list/filter-buyInfoList.component.vue";
import errDbComponent from "../common/error-db.container.vue";

import { commonMount } from "../common/common-mount";
import { useBuyAct } from "./useFilterBuyAct";
import { ID } from "../../model/id.value";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    buyActComponent,
    filterBuyInfoListComponent,
    errDbComponent,
  },
  setup() {
    const { categorys, uid } = commonMount();
    const { buyInfoList, activeCategory, filterStatus, filterbuyListRq } =
      useBuyAct();
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

    const changeBuyResultUi = (buyResult: boolean, buyInfoId: ID) => {
      if (buyInfoList.value) {
        store.dispatch("changeBuyResultStore", {
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
      //【課題】ここに書いてよい？
      //store層に書こうと思いましたが、結果エラー発生
      if (!buyInfoList.value) return;
      const isNoBuy = buyInfoList.value.every((v) => {
        return v.buyResult === false;
      });
      if (isNoBuy) {
        alert("購入しているものがございません");
        return;
      }

      store
        .dispatch("buyFinStore", {
          buyInfoList: buyInfoList.value,
          uid: uid.value,
        })
        .then(() => {
          buyInfoList.value = store.getters.getBuyResultList;
          alert("更新しました");
        })
        .catch(() => {});
    };

    const resetBuyResultUi = () => {
      store.dispatch("resetBuyResultStore", {
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
// table {
//   display: block;
//   overflow-y: scroll;
//   height: 400px;
// }
// table thead {
//   position: sticky;
//   top: 0;
//   z-index: 1;
//   background-color: white;
// }

table {
  margin-bottom: 5px;
}
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
