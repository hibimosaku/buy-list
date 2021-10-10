<template>
  <navComponent></navComponent>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">品目名</label>
    <input type="text" class="form-control" v-model="itemName" />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">価格</label>
    <input type="text" class="form-control" v-model="itemPrice" />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">分類名</label>
    <select v-model="categoryId">
      <option
        v-for="(category, index) in categorys"
        :key="category"
        :value="index"
        :index="index"
      >
        {{ category.name }}
      </option>
    </select>
    <!-- <input type="text" class="form-control" v-model="categoryId" /> -->
  </div>
  <button
    type="button"
    class="btn btn btn-primary btn-lg"
    v-on:click="registerItem"
  >
    新規登録
  </button>
  <!-- <button type="button" class="btn btn btn-primary btn-lg" v-on:click="changeItem">変更</button> -->

  <hr />
  <!-- <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">変更</button>
      <button type="button" class="btn btn-warning">削除</button>
    </div> -->
  <div v-if="active_all === true">
    <div v-for="(val, index) in items" :key="val" :index="index">
      <input v-model="val.name" v-on:change="changeItem(index, val)" />
      <span
        class="badge bg-danger"
        style="cursor: hand; cursor: pointer"
        v-on:click="deleteItem(index)"
        >削除</span
      >
    </div>
  </div>

  <div v-for="(val, index) in items" :key="val" :index="index">
    <div v-if="active_tab == val.category_id">
      <div>
        <input v-model="val.name" v-on:change="changeItem(index, val)" />
        <span
          class="badge bg-danger"
          style="cursor: hand; cursor: pointer"
          v-on:click="deleteItem(index)"
          >削除</span
        >
      </div>
    </div>
  </div>

  <!-- <div v-if="active_tab == 1">
      <div v-for="(item, index) in item1" :key="item" :index="index">
        <input
          v-model="item[1].name"
          v-on:change="changeItem(item[0], item[1])"
        />
      </div>
    </div>
    <div v-if="active_tab == 2">
      <div v-for="(item, index) in item2" :key="item" :index="index">
        <input
          v-model="item[1].name"
          v-on:change="changeItem(item[0], item[1])"
        />
      </div>
    </div> -->

  <!-- </div> -->
  <!-- </div> -->

  <hr />
  <!-- {{ items }} -->
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
import { ItemRepository } from "../model/item.repository";
import { saveItemUc, startItem } from "../model/item.use-case";
import { store } from "../store/store";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    // let store = useStore(key);
    let itemName = ref();
    let itemPrice = ref();
    let categoryId = ref();
    let items = ref();
    let item1 = ref();
    let item2 = ref();
    let active_tab = ref();
    let active_all = ref();

    let categorys = ref();

    onMounted(() => {
      categorys.value = store.getters.getCategorys;
    });
    active_all.value = true;
    // 　  items.value=store.getters.getItems

    // items.value =
    startItem().then((v) => {
      items.value = v;
    });

    //以下のコードなら、データ取得可能。本当は123行目でしたい
    // ItemRepository.getItem("userID").then(value=>{
    //   items.value=value
    // })

    let registerItem = () => {
      saveItemUc(categoryId.value, itemName.value, itemPrice.value);
      items.value = store.getters.getItems;
      alert("新規登録完了");
    };

    let changeItem = (index: string, val: any) => {
      store.dispatch("changeItem", [
        categoryId.value,
        val.name,
        val.price,
        index,
      ]);
      items.value = store.getters.getItems;
      alert("変更完了");
    };

    let activeCategory = (id: any) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };
    // let updateItem =(a:any,b:any)=>{
    //   console.log(items.value,a,b)
    //   // console.log(items.value[a].name,b)
    //   // console.log(a,b)
    //   // saveItemUc()
    // }

    // let updateItem = ()=>{
    //   saveItemUc(itemName.value,itemPrice.value,id)
    //   alert('登録完了')
    // }

    // let get = ()=>{
    //   ItemRepository.getItem("userID").then(value=>{
    //     items.value=value
    //   })
    // }
    let deleteItem = async (index: string) => {
      await store.dispatch("deleteItem", ["userID", index]);
      items.value = store.getters.getItems;
      alert("削除しました");
    };
    return {
      items,
      itemName,
      itemPrice,
      categorys,
      registerItem,
      active_tab,
      activeCategory,
      changeItem,
      item1,
      item2,
      categoryId,
      deleteItem,
      active_all,
      activeAll,
    };
  },
});
</script>
