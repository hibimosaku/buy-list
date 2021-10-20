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
      placeholder="Username"
      aria-label="Username"
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
      placeholder="Username"
      aria-label="Username"
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
    v-on:click="registerItem()"
  >
    新規登録
  </button>

  <div class="container" style="margin: 10px 0px">
    <div class="row">
      <div class="col-6">品目名</div>
      <div class="col-4">目安価格</div>
      <div class="col-2"></div>
    </div>
  </div>

  <div v-if="active_all === true">
    <div v-for="(val, index) in itemList" :key="val">
      <div v-if="val">
        <div class="input-group mb-3">
          <input
            v-model="val.item.name"
            v-on:change="changeItem(val, index)"
            type="text"
            class="form-control col-6"
            placeholder="品目名"
            aria-label="品目名"
            aria-describedby="button-addon2"
          />
          <input
            v-model="val.item.price"
            v-on:change="changeItem(val, index)"
            type="number"
            class="form-control col-4"
            placeholder="目安価格"
            aria-label="目安価格"
            aria-describedby="button-addon2"
          />
          <button
            v-on:click="deleteItem(val.item.id, index)"
            class="btn btn-outline-secondary col-2"
            type="button"
            id="button-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(val, index) in itemList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="active_tab == val.categoryId">
        <input
          v-model="val.item.name"
          v-on:change="changeItem(val, index)"
          type="text"
          class="form-control col-6"
          placeholder="品目名"
          aria-label="品目名"
          aria-describedby="button-addon2"
        />
        <input
          v-model="val.item.price"
          v-on:change="changeItem(val, index)"
          type="number"
          class="form-control col-4"
          placeholder="価格"
          aria-label="価格"
          aria-describedby="button-addon2"
        />
        <button
          v-on:click="deleteItem(val.item.id, index)"
          class="btn btn-outline-secondary col-2"
          type="button"
          id="button-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <categoryContainer
    v-if="categorys"
    :propsStore="categorys"
    v-on:propsActiveCategory="activeCategory"
    v-on:propsActiveCategoryAll="activeAll"
  ></categoryContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import { store } from "../store/store";
import { SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
  },
  //refに頼らない。
  setup() {
    let itemName = ref<string | null>();
    let itemPrice = ref<number | null>();
    let categoryId = ref<string | null>();
    let itemList = ref<string | null>();
    let active_tab = ref<string | null>();
    let active_all = ref<boolean | null>();
    let categorys = ref<Array<string> | null>();

    onMounted(() => {
      categorys.value = store.getters.getCategorys;
      itemList.value = store.getters.getItems; //computed
    });
    active_all.value = true;

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
      store.dispatch("registerItem", {
        categoryId: categoryId.value,
        name: itemName.value,
        price: itemPrice.value,
        userId: "userID",
      });
      alert("新規登録完了");
      itemName.value = null;
      itemPrice.value = null;
      categoryId.value = null;
    };

    //name,price単独で変更可なので、一緒にしたい
    let changeItem = (val: SingleItemList, index: string) => {
      store.dispatch("changeItem", {
        categoryId: val.categoryId,
        name: val.item.name,
        price: val.item.price,
        itemId: val.item.id,
        userId: "userID",
        index,
      });
      // itemList.value = store.getters.getItems;
    };

    let activeCategory = (id: string) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };

    let deleteItem = (id: string, index: string) => {
      store.dispatch("deleteItem", {
        userId: "userID",
        itemId: id,
        index: index,
      });
      alert("削除しました");
      // itemList.value = store.getters.getItems;
    };
    return {
      itemList,
      itemName,
      itemPrice,
      categorys,
      registerItem,
      active_tab,
      active_all,
      changeItem,
      categoryId,
      deleteItem,
      activeAll,
      activeCategory,
    };
  },
});
</script>
