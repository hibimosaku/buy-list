<template>
  <navComponent></navComponent>
  <div class="input-group input-group-sm mb-3">
    <span
      class="input-group-text"
      id="basic-addon1"
      style="height: calc(1.5em + 0.5rem)"
      >品目名</span
    >
    <input
      type="text"
      class="form-control"
      aria-describedby="basic-addon1"
      v-model="itemName"
      style="font-size:14px transform: scale(0.8);"
    />
  </div>

  <div class="input-group input-group-sm mb-3">
    <span
      class="input-group-text"
      id="basic-addon1"
      style="height: calc(1.5em + 0.5rem)"
      >価　格</span
    >
    <input
      type="text"
      class="form-control"
      aria-describedby="basic-addon1"
      v-model="itemPrice"
      style="font-size:14px transform: scale(0.8);"
    />
  </div>

  <div class="input-group input-group-sm mb-3">
    <label
      class="input-group-text"
      for="inputGroupSelect01"
      style="height: calc(1.5em + 0.5rem)"
      >分　類</label
    >
    <select class="form-control" id="inputGroupSelect01" v-model="categoryId">
      <option
        v-for="(category, index) in categorys"
        :key="category"
        :value="index"
        style="font-size:14px transform: scale(0.8);"
      >
        {{ category.name }}
      </option>
    </select>
  </div>

  <button
    type="button"
    class="btn btn btn-primary btn-sm small"
    @click="createItemUi()"
  >
    新規登録
  </button>

  <div class="container" style="margin: 10px 0px">
    <div class="row">
      <div class="col-6">品目名</div>
      <div class="col-4">目安価格</div>
      <div class="col-2">削除</div>
    </div>
  </div>
  <!-- @dragstart="dragstart(val, $event)" -->
  <!-- @dragstart="dragstart(val, $event)"
      @dragenter="dragenter(val)"
      @dragover.stop.prevent="dragover"
      @dragend.stop.prevent="dragend" -->

  <div v-if="activeCategory === 'all'">
    <div
      v-for="(val, index) in itemListDisplay"
      :key="index"
      draggable="true"
      @dragstart="dragstart(val, $event)"
      @dragenter="dragenter(val, $event)"
      @dragover.stop.prevent="dragover"
      @dragend.stop.prevent="dragend"
    >
      <div v-if="val">
        <div class="input-group mb-3">
          <itemContainer
            :val="val"
            :index="index"
            @chaeItemNameUi="chgeItemNameUi"
            @changeItemPriceUi="changeItemPriceUi"
            @deleteItemUi="deleteItemUi"
          ></itemContainer>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(val, index) in BuyInfoList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="activeCategory == val.categoryId">
        <itemContainer
          :val="val"
          :index="index"
          @chaeItemNameUi="chgeItemNameUi"
          @changeItemPriceUi="changeItemPriceUi"
          @deleteItemUi="deleteItemUi"
        ></itemContainer>
      </div>
    </div>
  </div>

  <categoryContainer
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import itemContainer from "./container/item.container.vue";

import { BuyInfoList, BuyInfo } from "../model/buy-info.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    itemContainer,
  },
  //refに頼らない。
  setup() {
    let itemName = ref<string | null>();
    let itemPrice = ref<number | null>();
    let categoryId = ref<string | null>();
    let BuyInfoList = ref<BuyInfoList>();
    let categorys = ref<Array<string> | null>();
    let activeCategory = ref();
    let uid: string;

    onMounted(() => {
      uid = store.getters.getUid;
      BuyInfoList.value = store.getters.getItems; //computed
      categorys.value = store.getters.getCategorys;
    });

    let itemListDisplay = computed((): any => {
      if (BuyInfoList.value) {
        let result: BuyInfoList = BuyInfoList.value.sort(
          (a: BuyInfo, b: BuyInfo) => Number(a.buyInfoId) - Number(b.buyInfoId)
        );
        store.commit("sortItemList", { list: result, uid: uid });
        BuyInfoList.value = store.getters.getItems; //computed
        return result;
      }
    });

    let draggingItem: any = ref();
    draggingItem.value = null;

    let dragstart = (item: any, e: any) => {
      draggingItem.value = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = "move"; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
      console.log(e);
    };
    let dragenter = (item: any, e: any) => {
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.item.id, draggingItem.value.item.id] = [
        draggingItem.value.item.id,
        item.item.id,
      ];
    };
    let dragover = (e: any) => {
      e.dataTransfer.dropEffect = "move"; // 移動モードに設定
    };
    let dragend = (e: any) => {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      draggingItem.value = null; // ドラッグ中の要素をクリア
    };

    activeCategory.value = "all";

    const createItemUi = () => {
      if (
        itemName.value == null ||
        itemPrice.value == null ||
        categoryId.value == null ||
        categoryId.value == "分類名"
      ) {
        alert("すべて入力してください");
        return;
      }
      store.commit("createItemStore", {
        categoryId: categoryId.value,
        name: itemName.value,
        price: itemPrice.value,
        uid: uid,
      });
      alert("新規登録完了");
      itemName.value = null;
      itemPrice.value = null;
      categoryId.value = null;
    };

    const changeItemNameUi = (buyInfoId: string, name: string) => {
      store.commit("changeItemNameStore", {
        buyInfoId,
        name,
        uid,
      });
    };

    const changeItemPriceUi = (buyInfoId: string, price: number) => {
      store.commit("changeItemPriceStore", {
        buyInfoId,
        price,
        uid,
      });
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    const deleteItemUi = (id: string) => {
      console.log(id);
      store.commit("deleteItemStore", {
        uid: uid,
        buyInfoId: id,
      });
      alert("削除しました");
      // BuyInfoList.value = store.getters.getItems;
    };

    return {
      BuyInfoList,
      itemName,
      itemPrice,
      categorys,
      createItemUi,
      changeItemNameUi,
      categoryId,
      deleteItemUi,
      activeCategory,
      onActiveCategory,
      changeItemPriceUi,
      itemListDisplay,
      draggingItem,
      dragstart,
      dragenter,
      dragover,
      dragend,
    };
  },
});
</script>
