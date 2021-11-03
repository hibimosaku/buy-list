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
      >
        {{ category.name }}
      </option>
    </select>
  </div>

  <button
    type="button"
    class="btn btn btn-primary btn-sm small"
    @click="registerItem()"
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
            @changeItemName="changeItemName"
            @changeItemPrice="changeItemPrice"
            @deleteItem="deleteItem"
          ></itemContainer>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(val, index) in itemList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="activeCategory == val.categoryId">
        <itemContainer
          :val="val"
          :index="index"
          @changeItemName="changeItemName"
          @changeItemPrice="changeItemPrice"
          @deleteItem="deleteItem"
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

import { ItemList, SingleItemList } from "../model/item-list.model";

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
    let itemList = ref<ItemList>();
    let categorys = ref<Array<string> | null>();
    let activeCategory = ref();
    let uid: string;

    onMounted(() => {
      uid = store.getters.getUid;
      itemList.value = store.getters.getItems; //computed
      categorys.value = store.getters.getCategorys;
    });

    let itemListDisplay = computed((): any => {
      if (itemList.value) {
        let result: ItemList = itemList.value.sort(
          (a: SingleItemList, b: SingleItemList) =>
            Number(a.item.id) - Number(b.item.id)
        );
        store.commit("sortItemList", { list: result, uid: uid });
        itemList.value = store.getters.getItems; //computed
        return result;
      }
    });

    // draggable="true"
    // @dragstart="dragstart(val, $event)"
    // @dragenter="dragenter(val)"
    // @dragover.stop.prevent="dragover"
    // @dragend.stop.prevent="dragend"

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
      console.log(e);
    };
    let dragover = (e: any) => {
      e.dataTransfer.dropEffect = "move"; // 移動モードに設定
    };
    let dragend = (e: any) => {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      draggingItem.value = null; // ドラッグ中の要素をクリア
    };

    activeCategory.value = "all";

    let registerItem = () => {
      if (
        itemName.value == null ||
        itemPrice.value == null ||
        categoryId.value == null ||
        categoryId.value == "分類名"
      ) {
        alert("すべて入力してください");
        return;
      }
      store.commit("registerItem", {
        categoryId: categoryId.value,
        name: itemName.value,
        price: itemPrice.value,
        userId: uid,
      });
      alert("新規登録完了");
      itemName.value = null;
      itemPrice.value = null;
      categoryId.value = null;
    };

    let changeItemName = (val: SingleItemList, index: number) => {
      store.commit("changeItemName", {
        val,
        uid,
        index,
      });
    };

    let changeItemPrice = (val: SingleItemList, index: number) => {
      store.commit("changeItemPrice", {
        val,
        uid,
        index,
      });
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let deleteItem = (id: string, index: number) => {
      store.commit("deleteItem", {
        userId: "userID",
        itemId: id,
        index: index,
      });
      alert("削除しました");
    };

    return {
      itemList,
      itemName,
      itemPrice,
      categorys,
      registerItem,
      changeItemName,
      categoryId,
      deleteItem,
      activeCategory,
      onActiveCategory,
      changeItemPrice,

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
