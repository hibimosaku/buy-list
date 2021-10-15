<template>
  <navComponent></navComponent>


<table class="table">
  <thead>
    <tr>
      <th scope="col">品目名</th>
      <th scope="col">目安価格</th>
      <th scope="col colspan=3">状態</th>
    </tr>
  </thead>
    <tbody>
      <tr v-for="(val,index) in itemList" :key="val" :index="index">
        <td>{{val.item.name}}</td>
        <td>{{val.item.price}}</td>
        <td>{{val.itemStatus!='no' || val.itemStatus!='want' ? val.itemStatus : '-'}}</td>
        <td><button type="button" v-bind:class="{'btn btn-primary': val.itemStatus=='no','btn btn-light': val.itemStatus!='no'}" v-on:click="changeNo(val)">なし</button></td>

        <td><button type="button" v-bind:class="{'btn btn-primary': val.itemStatus=='want','btn btn-light': val.itemStatus!='want'}" v-on:click="changeWant(val)">ほしい</button></td>
      </tr>
    </tbody>
</table>



  <hr>
  <div class="btn-group" role="group" aria-label="Basic outlined example">
    <button type="button" class="btn btn-outline-primary">ALL</button>
  </div>
  <div class="btn-group" role="group" aria-label="Basic outlined example" v-for="category in categorys" :key=category>
    <button type="button" class="btn btn-outline-primary">{{category.name}}</button>
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
    let itemList = ref<string | null>();
    let categorys = ref<Array<string> | null>();
    let active_id=ref()
    onMounted(() => {
      categorys.value = store.getters.getCategorys;
      itemList.value = store.getters.getItems;
    });
    let changeNo=(val:any)=>{
      active_id.value=val.item.id
    }
    return {
      itemList,
      categorys,
      changeNo,
      active_id
    }
  },
});
</script>
