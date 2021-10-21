<template>
  <navComponent></navComponent>


<div class="input-group input-group-sm mb-3">
  <span class="input-group-text" id="basic-addon1" style="height:calc(1.5em + .5rem)">品目名</span>
  <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="itemName">
</div>

<div class="input-group input-group-sm mb-3">
  <span class="input-group-text" id="basic-addon1" style="height:calc(1.5em + .5rem)">価　格</span>
  <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="itemPrice">
</div>

<div class="input-group input-group-sm mb-3">
  <label class="input-group-text" for="inputGroupSelect01" style="height:calc(1.5em + .5rem)">分　類</label>
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

  <div class="container" style="margin:10px 0px;">
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
          <itemContainer
            :val="val"
            :index="index"
            v-on:changeItem="changeItem"
            v-on:deleteItem="deleteItem"                 
          ></itemContainer>
          
        </div>
      </div>
    </div>
  </div>
  
  <div v-for="(val, index) in itemList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="active_tab == val.categoryId">   
          <itemContainer
            :val="val"
            :index="index"
            v-on:changeItem="changeItem"
            v-on:deleteItem="deleteItem"                 
          ></itemContainer>
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
import categoryContainer from "./container/category-list.container.vue"
import itemContainer from "./container/item.container.vue"
import { store } from "../store/store";
import { SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    itemContainer
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
    console.log("itemCreate")

    onMounted(() => {
      console.log("itemMount")
      categorys.value = store.getters.getCategorys;
      itemList.value = store.getters.getItems;//computed
    });
    active_all.value = true;

    let registerItem = () => {
      if (
        itemName.value == null ||
        itemPrice.value == null ||
        categoryId.value == null ||
        categoryId.value =="分類名"
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

//name,price単独で変更可なので、別々にしたい
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
