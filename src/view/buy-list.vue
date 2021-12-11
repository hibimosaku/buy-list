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
    <button class="btn btn-primary btn-sm" @click="resetBuyRequestUi">リセット</button>
    <button class="btn btn-primary btn-sm" @click="lineRequest">買物依頼Line</button>
  </div>
    
  <input
    class="form-control　form-control-sm me-2"
    v-model="search"
    type="search"
    style="margin-bottom:10px;"
    placeholder="文字入力で検索できます"
  />
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
import { store } from "../store/store";

import categoryComponent from "./component/category-list.component.vue";
import buyListComponent from "./component/buy-list.component.vue";
import filterBuyInfoListComponent from "./component/filter-buyInfoList.component.vue";
import errDbComponent from "./container/error-db.container.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";
import { Line } from "../model/line.use.case";

export default defineComponent({
  components: {
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
    const search = ref("");


    onMounted(() => {
      buyInfoList.value = store.getters.getBuyInfoList;
    });

    const filterbuyList = computed((): BuyInfoList | null => {
      let result: BuyInfoList;

      if (buyInfoList.value === undefined) return null;

      function kanaToHira(str:string) {
        return str.replace(/[\u30a1-\u30f6]/g, function(match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });    
      }

      function hiraToKana(str:string) {
          return str.replace(/[\u3041-\u3096]/g, function(match) {
              var chr = match.charCodeAt(0) + 0x60;
              return String.fromCharCode(chr);
          });
      }
      const searchByKana=kanaToHira(search.value)
      const searchByHira=hiraToKana(search.value)

      if (activeCategory.value === "all" && search.value === "") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value === "all") return v != null;
          if (filterStatus.value === "no") return v.buyRequest === false;
          if (filterStatus.value === "want") return v.buyRequest === true;
          return null;
        });
        return result;
      }

      if (activeCategory.value === "all" && search.value !== "") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (filterStatus.value === "all" && buyInfoList.value)
            return v! !== null && (v.item.name.includes(String(searchByKana)) || v.item.name.includes(String(searchByHira))) 
          if (filterStatus.value === "no")
            return (
              v.buyRequest === false &&
              v.item.name.includes(String(search.value))
            );
          if (filterStatus.value === "want")
            return (
              v.buyRequest === true &&
              v.item.name.includes(String(search.value))
            );
          return null;
        });
        return result;
      }

      if (activeCategory.value !== "all" && search.value === "") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "all"
          )
            return v != null;
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "no"
          )
            return v.buyRequest === false;
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "want"
          )
            return v.buyRequest === true;
          return null;
        });
        return result;
      }

      if (activeCategory.value !== "all" && search.value !== "") {
        result = buyInfoList.value.filter((v: BuyInfo) => {
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "all"
          )
            return v != null && v.item.name.includes(String(search.value));
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "no"
          )
            return (
              v.buyRequest === false &&
              v.item.name.includes(String(search.value))
            );
          if (
            activeCategory.value === v.categoryId &&
            filterStatus.value === "want"
          )
            return (
              v.buyRequest === true &&
              v.item.name.includes(String(search.value))
            );
          return null;
        });
        return result;
      }
      return null;
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

    const resetBuyRequestUi = ()=>{
      store.commit("resetBuyRequestStore", {
        id: activeCategory.value,
        uid: uid.value,
      });
    }

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
      lineRequest
    };
  },
});
</script>
<style lang="scss" scoped>
/*　スクロールバーの実装 */
table {
  display: block;
  overflow-y: scroll;
  height: 410px;
}
table thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}
</style>
