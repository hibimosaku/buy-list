<template>
  <navComponent></navComponent>

  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">購入日</th>
        <th scope="col colspan=2">状態</th>
      </tr>
    </thead>
    <tbody v-if="active_all === true">
      <tr v-for="(val, index) in itemList" :key="val" :index="index">
        <td>{{ val.item.name }}</td>
        <td>{{ val.item.price }}</td>
        <td>
          {{ val.buyDay != null ? val.buyDay : "－" }}
        </td>
        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.itemStatus == false,
              'btn btn-light': val.itemStatus != false,
            }"
            v-on:click="changeItemStatusNo(val, index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-x"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"
              />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
          </button>
        </td>

        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.itemStatus == true,
              'btn btn-light': val.itemStatus != true,
            }"
            v-on:click="changeItemStatusWant(val, index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in itemList" :key="val" :index="index">
      <tr v-if="active_tab == val.categoryId">
        <td>{{ val.item.name }}</td>
        <td>{{ val.item.price }}</td>
        <td>
          {{ val.buyDay != null ? val.buyDay : "－" }}
        </td>
        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.itemStatus == false,
              'btn btn-light': val.itemStatus != false,
            }"
            v-on:click="changeItemStatusNo(val, index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-x"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"
              />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
          </button>
        </td>

        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.itemStatus == true,
              'btn btn-light': val.itemStatus != true,
            }"
            v-on:click="changeItemStatusWant(val, index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
import { ItemList, SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
  },
  setup() {
    let itemList = ref<ItemList>();
    let active_tab = ref<string | null>();
    let active_all = ref<boolean | null>();

    active_all.value = true;

    let categorys = ref<Array<string> | null>();
    onMounted(() => {
      categorys.value = store.getters.getCategorys;
      itemList.value = store.getters.getItems;
    });
    let changeItemStatusNo = (val: SingleItemList, index: string) => {
      store.dispatch("changeItemStatus", {
        val,
        status: false,
        index,
        userId: "userID",
      });
    };
    let changeItemStatusWant = (val: SingleItemList, index: string) => {
      store.dispatch("changeItemStatus", {
        val,
        status: true,
        index,
        userId: "userID",
      });
    };
    let activeCategory = (id: string) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };

    return {
      active_tab,
      active_all,
      itemList,
      categorys,
      changeItemStatusNo,
      changeItemStatusWant,
      activeAll,
      activeCategory,
    };
  },
});
</script>
