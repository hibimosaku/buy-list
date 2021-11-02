<template>
  <navComponent></navComponent>

  <div class="dropdown">
    <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
      </svg>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item small" @click="filterStatus='all'">すべて</a></li>
      <li><a class="dropdown-item small" @click="filterStatus='buy'">買うのみ</a></li>
      <li><a class="dropdown-item small" @click="filterStatus='no'">ないのみ</a></li>
    </ul>
    <span style="font-size:10px;">{{filterStatus=='buy' ? '買うの絞り込み':filterStatus=='no' ? 'ないのみ':null}}</span>

  </div>
  <div class="dropdown">
    <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      リセット
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item small" @click="resetBuyStatus(activeCategory)">すべて</a></li>
      <li><a class="dropdown-item small" @click="resetBuyStatus(activeCategory)">選択の分類のみ</a></li>
    </ul>
    <span style="font-size:10px;">{{filterStatus=='buy' ? '買うの絞り込み':filterStatus=='no' ? 'ないのみ':null}}</span>

  </div>
  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col">買う</th>
        <th scope="col">ない</th>
      </tr>
    </thead>
    <tbody v-if="activeCategory === 'all'">
      <tr v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
        <buyRequestContainer
          :val="val"
          :index="index"
          @changeBuyStatus="changeBuyStatus"
        ></buyRequestContainer>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in filterbuyListRq" :key="val" :index="index">
      <tr v-if="activeCategory == val.categoryId">
        <buyRequestContainer
          :val="val"
          :index="index"
          @changeBuyStatus="changeBuyStatus"
        ></buyRequestContainer>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-success btn-block" type="button" @click="buyFin">
    購入完了
  </button>

  <categoryContainer
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryContainer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import buyRequestContainer from "./container/buy-request.container.vue";

import { store } from "../store/store";
import { ItemList, SingleItemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
    buyRequestContainer,
  },
  setup() {
    let buyListRq = ref<ItemList>();

    let categorys = ref<Array<string> | null>();
    let uid: string;
    let activeCategory = ref();
    let filterStatus=ref<string>('all' || 'buy'|| 'no')
    filterStatus.value='all'

    activeCategory.value = "all";

    onMounted(async () => {
      uid = await store.getters.getUid;
      categorys.value = await store.getters.getCategorys;
      buyListRq.value = store.getters.getBuyStatusItems;
    });

    const filterbuyListRq=computed(():ItemList | null =>{
      let result:ItemList
      if(buyListRq.value){
        result= buyListRq.value.filter((v:any)=>{
          if(filterStatus.value=='all') return v!=null
          if(filterStatus.value=='no') return v.buyStatus==false
          if(filterStatus.value=='buy') return v.buyStatus==true
          return null
        })
        return result
      }else{
        return null
      }
    })


    let changeBuyStatus = (
      status: boolean,
      index: number,
      val: SingleItemList,
    ) => {
      if (buyListRq.value) {
        buyListRq.value[index].buyStatus = status;
        store.commit("changeBuyStatus", {
          status,
          val,
          uid
        });
      }
    };

    let onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    let buyFin = () => {
      store.commit("buyFin", {
        val: buyListRq.value,
        userId: uid,
      });
      buyListRq.value = store.getters.getBuyStatusItems;
    };

    let resetBuyStatus=(categoryId:string)=>{
      store.commit("resetBuyStatus",{
        id:categoryId,
      })
      buyListRq.value = store.getters.getBuyStatusItems;

    }



    return {
      buyListRq,
      categorys,
      buyFin,
      activeCategory,
      onActiveCategory,
      changeBuyStatus,
      filterStatus,
      filterbuyListRq,
      resetBuyStatus
    };
  },
});
</script>
