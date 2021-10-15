<template>
  <navComponent></navComponent>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">品目名</label>
    <input type="text" class="form-control" v-model="itemName" />
  </div>

  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">価格</label>
    <input type="number" class="form-control" v-model="itemPrice" />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">分類名</label>
    <select v-model="categoryId" >
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
    class="btn btn btn-primary btn-lg"
    v-on:click="registerItem()"
  >
    新規登録
  </button>
  <br>
  <br>
      <div class="row">
          <div class="col-6">品目名</div>
          <div class="col-4">価格</div>
          <div class="col-2">削除</div>
      </div>
<hr style="margin:2">
    <div v-if="active_all === true">
    <div v-for="(val,index) in itemList" :key="val">
      <div v-if="val">
        <div class="input-group mb-3">
          <input  v-model="val.item.name" v-on:change="changeItem(val,index)" type="text" class="form-control col-6" placeholder="品目名" aria-label="品目名" aria-describedby="button-addon2">
          <input  v-model="val.item.price" v-on:change="changeItem(val,index)" type="number" class="form-control col-4" placeholder="価格" aria-label="価格" aria-describedby="button-addon2">
          <button v-on:click="deleteItem(val.item.id,index)" class="btn btn-outline-secondary col-2" type="button" id="button-addon2">削除</button>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(val,index) in itemList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="active_tab == val.categoryId">
        <input  v-model="val.item.name" v-on:change="changeItem(val,index)" type="text" class="form-control col-6" placeholder="品目名" aria-label="品目名" aria-describedby="button-addon2">
        <input  v-model="val.item.price" v-on:change="changeItem(val,index)" type="number" class="form-control col-4" placeholder="価格" aria-label="価格" aria-describedby="button-addon2">
        <button v-on:click="deleteItem(val.item.id,index)" class="btn btn-outline-secondary col-2" type="button" id="button-addon2">削除</button>
      </div>
    </div>
  </div>


  <div class="btn-group-sm" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-success btn-sm" v-on:click="activeAll">
      ALL
    </button>
    <button
      type="button"
      class="btn btn-primary"
      v-for="(category, index) in categorys"
      :key="category.name"
      :index="index"
      v-on:click="activeCategory(index)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navComponent from "../component/nav.vue";
import { store } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
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
      itemList.value = store.getters.getItems;
    });
    active_all.value = true;

    let registerItem = () => {
      if(itemName.value==null || itemPrice.value==null || categoryId==null){
        alert("すべて入力してください")
        return
      }
      store.dispatch("registerItem", {
        categoryId: categoryId.value,
        name: itemName.value,
        price: itemPrice.value,
        userId: "userID",
      })
      alert("新規登録完了");
      itemName.value=null
      itemPrice.value=null
      categoryId.value=null
    };

    let changeItem = (val: any,index:any) => {
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

    let activeCategory = (id: any) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };

    let deleteItem = (id:string,index: string) => {
      store.dispatch("deleteItem", {userId:"userID", itemId:id,index:index});
      alert("削除しました");
      itemList.value = store.getters.getItems;


    };
    return {
      itemList,
      itemName,
      itemPrice,
      categorys,
      registerItem,
      active_tab,
      activeCategory,
      changeItem,
      categoryId,
      deleteItem,
      active_all,
      activeAll,
    };
  },
});
</script>
