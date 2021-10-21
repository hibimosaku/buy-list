<template>
  <navComponent></navComponent>
  <table class="table small">
    <thead>
      <tr>
        <th scope="col">品目名</th>
        <th scope="col">価格</th>
        <th scope="col colspan=2">状態</th>
      </tr>
    </thead>
    <tbody v-if="active_all === true">
      <tr v-for="(val, index) in buyList" :key="val" :index="index">
        <td>{{ val.item.name }}</td>
        <td>{{ val.item.price }}</td>
        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.buyStatus == true,
              'btn btn-light': val.buyStatus != true,
            }"
            @click="changeBuyStatusBuy(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
              />
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              />
            </svg>
          </button>
        </td>

        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.buyStatus == false,
              'btn btn-light': val.buyStatus != false,
            }"
            @click="changeBuyStatusNo(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-x-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>

    <tbody v-for="(val, index) in buyList" :key="val" :index="index">
      <tr v-if="active_tab == val.categoryId">
        <td>{{ val.item.name }}</td>
        <td>{{ val.item.price }}</td>
        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.buyStatus == true,
              'btn btn-light': val.buyStatus != true,
            }"
            @click="changeBuyStatusBuy(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
              />
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              />
            </svg>
          </button>
        </td>

        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': val.buyStatus == false,
              'btn btn-light': val.buyStatus != false,
            }"
            @click="changeBuyStatusNo(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-x-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>

    test
    <!-- <tbody v-if="active_all===true">
      <tr v-for="(val, index) in buyList" :key="val" :index="index">
        <td>{{ Test[index].item.name }}</td>
        <td>{{ Test[index].item.price }}</td>
        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': Test[index].buyStatus == true,
              'btn btn-light': Test[index].buyStatus != true,
            }"
            @click="changeBuyStatusBuyTest(index)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>          
          </button>
        </td>

        <td>
          <button
            type="button"
            v-bind:class="{
              'btn btn-primary': Test[index].buyStatus == false,
              'btn btn-light': Test[index].buyStatus != false,
            }"
            @click="changeBuyStatusNoTest(index)"

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
            </svg>         
         </button>
        </td>
      </tr>
    </tbody> -->
    <!-- test2
<input v-model="aaa">
{{bbb}}:{{aaa}} -->
  </table>
  <button
    class="btn btn-success btn-block"
    type="button"
    @click="buyFinish"
  >
    購入完了
  </button>

  <br />

  <categoryContainer
    v-if="categorys"
    :propsStore="categorys"
    v-on:propsActiveCategory="activeCategory"
    v-on:propsActiveCategoryAll="activeAll"
  ></categoryContainer>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import navComponent from "./component/nav.vue";
import categoryContainer from "./container/category-list.container.vue";
import { store } from "../store/store";
import { ItemList, purifyitemList } from "../model/item-list.model";

export default defineComponent({
  components: {
    navComponent,
    categoryContainer,
  },
  setup() {
    let buyList = ref<ItemList>();
    let active_tab = ref<string | null>();
    let active_all = ref<boolean | null>();
    let categorys = ref<Array<string> | null>();
    // let buyListTest:ItemList

    active_all.value = true;

    onMounted(() => {
      categorys.value = store.getters.getCategorys;
      buyList.value = purifyitemList(store.getters.getBuyStatusItems);
    });

    let changeBuyStatusNo = (index: number) => {
      if (buyList.value) {
        buyList.value[index].buyStatus = false;
      }
    };

    let changeBuyStatusBuy = (index: number) => {
      if (buyList.value) {
        buyList.value[index].buyStatus = true;
        console.log(store.getters.getBuyStatusItems);
      }
    };

    let activeCategory = (id: string) => {
      active_tab.value = id;
      active_all.value = false;
    };
    let activeAll = () => {
      active_all.value = true;
      active_tab.value = null;
    };

    let buyFinish = () => {
      store.commit("submitBuyStatus", { val: buyList.value, userId: "userID" });
      buyList.value = store.getters.getBuyStatusItems;
    };

    //     let Test=computed({
    //       get(){
    //         buyListTest=purifyitemList(store.getters.getBuyStatusItems)
    // console.log('get',buyListTest,store.state.itemList)
    //         return [...buyListTest]
    //       },
    //       set(){
    //       }
    //     })

    // let changeBuyStatusNoTest = (index:number) => {
    //   if(buyList.value){
    //     // let fadsa=[...buyListTest]
    //     // fadsa[index].buyStatus=false
    //     // buyListTest=[...fadsa]
    //     buyList.value[index].buyStatus=false
    //     console.log('no',store.state.itemList)
    //   }
    // };

    // let changeBuyStatusBuyTest = (index:number) => {
    //   if(buyList.value){
    //     buyList.value[index].buyStatus=true
    //     console.log('buy',store.state.itemList)

    //   }
    // };

    let bbb: number;
    let aaa = computed({
      get() {
        return bbb;
      },
      set(ccc: number) {
        if (ccc > 10) {
          bbb = 100;
        }
        if (ccc < 10) {
          bbb = 5;
        }
        //     console.log(ccc)
        // bbb=1

        console.log(bbb, ccc);
      },
    });

    return {
      active_tab,
      active_all,
      buyList,
      categorys,
      changeBuyStatusNo,
      changeBuyStatusBuy,
      activeAll,
      activeCategory,
      buyFinish,
      // Test,
      // buyListTest,
      // changeBuyStatusNoTest,
      // changeBuyStatusBuyTest,
      aaa,
    };
  },
});
</script>
