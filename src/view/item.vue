<template>
  <div
    class="text-primary"
    style="margin-bottom: 10px"
    @click="newItem = !newItem"
  >
    <div v-if="!newItem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        /></svg
      ><span>new Item</span>
    </div>
    <div v-if="newItem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-dash"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
        /></svg
      ><span>new Item</span>
    </div>
  </div>
  <div v-if="newItem">
    {{ resultMessage }}
    <div
      :class="{
        'input-group input-group-sm mb-3': itemErrors.name === false,
        'input-group input-group-sm': itemErrors.name === true,
      }"
    >
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
        style="font-size: 16px"
      />
    </div>
    <p class="text-danger small" v-if="itemErrors.name">
      品目名の入力お願いします。
    </p>
    <!-- <p class="text-danger small" v-if="itemName.length>10">
          品目名は10文字以内の入力でお願いします。
        </p> -->

    <div
      :class="{
        'input-group input-group-sm mb-3': itemErrors.price === false,
        'input-group input-group-sm': itemErrors.price === true,
      }"
    >
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
        style="font-size: 16px"
      />
    </div>
    <p class="text-danger small" v-if="itemErrors.price">
      価格の入力お願いします。
    </p>

    <div
      :class="{
        'input-group input-group-sm mb-3': itemErrors.category === false,
        'input-group input-group-sm': itemErrors.category === true,
      }"
    >
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
          style="font-size: 16px"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <p class="text-danger small" v-if="itemErrors.category">
      分類の入力お願いします。
    </p>

    <button
      type="button"
      class="btn btn btn-primary btn-sm small"
      @click="createItemUi()"
    >
      新規登録
    </button>
  </div>

  <div style="margin: 10px 0px">
    <div class="row">
      <div class="col-6" style="text-align: center">品目名</div>
      <div class="col-2">価格</div>
      <div class="col-2">削除</div>
      <div
        class="col-2"
        style="font-size: 12px; text-align: left; padding: 0px"
      >
        並び替え
      </div>
    </div>
  </div>

  <div
    :class="{
      'list list_active_newItem': newItem,
      'list list_inActive_newItem': !newItem,
    }"
  >
    <div v-for="(val, index) in categoryBuyInfoList" :key="val" :index="index">
      <div v-if="val">
        <div class="input-group" style="margin-bottom: 10px">
          <itemComponent
            :val="val"
            :categoryBuyInfoList="categoryBuyInfoList"
            :index="index"
            :nextBuyInfoId="
              categoryBuyInfoList[index + 1] === undefined
                ? undefined
                : categoryBuyInfoList[index + 1].buyInfoId
            "
            :prevBuyInfoId="
              categoryBuyInfoList[index - 1] === undefined
                ? undefined
                : categoryBuyInfoList[index - 1].buyInfoId
            "
            @changeItemNameUi="changeItemNameUi"
            @changeItemPriceUi="changeItemPriceUi"
            @deleteItemUi="deleteItemUi"
            @sortUpItemUi="sortUpItemUi"
            @sortDownItemUi="sortDownItemUi"
          ></itemComponent>
        </div>
        <div
          class="text-danger"
          style="margin-bottom: 5px"
          v-if="val.item.price > 9999"
        >
          価格の限度額を超えています（0～9999円）
        </div>
        <div
          class="text-danger"
          style="margin-bottom: 5px"
          v-if="val.item.name.length > 10"
        >
          名前は10文字以内で入力してください
        </div>
      </div>
    </div>
  </div>
  <categoryComponent
    v-if="categorys"
    :categorys="categorys"
    :activeCategory="activeCategory"
    @onActiveCategory="onActiveCategory"
  ></categoryComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
// import { useStore } from 'vuex'
import { store } from "../store/store"


import navComponent from "./component/nav.component.vue";
import categoryComponent from "./component/category-list.component.vue";
import itemComponent from "./component/item.component.vue";
import errDbComponent from "./container/error-db.container.vue";

import { BuyInfo, BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";
import { ID } from "../model/id.value";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    itemComponent,
    errDbComponent,
  },
  //refに頼らない。
  setup() {
    // const store = useStore()
    // console.log(store,useStore())
    
    const itemName = ref<string | null>(null);
    const itemPrice = ref<number | null>(null);
    const categoryId = ref<string | null>(null);
    const buyInfoList = ref<BuyInfoList>();
    const activeCategory = ref("all");
    const { categorys, uid } = commonMount();
    const newItem = ref<boolean>(false);
    const itemErrors = ref({ name: false, price: false, category: false });
    const errorPrice = ref();

    const onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    onMounted(() => {
      buyInfoList.value = store.getters.getBuyInfoList;
      errorPrice.value = store.getters.getErrorchangeItemPrice;
    });
    const categoryBuyInfoList = computed(() => {
      if (activeCategory.value === "all") {
        return buyInfoList.value;
      } else {
        if (buyInfoList.value) {
          const result = buyInfoList.value.filter((v: BuyInfo) => {
            return v.categoryId === activeCategory.value;
          });
          return result;
        } else {
          throw new Error("buyInfolist is undefined");
        }
      }
    });

    const resultMessage = computed(() => {
      if (store.getters.getProcessing) {
        return "処理中です";
      } else {
        return;
      }
    });

    const createItemUi = async () => {
      if (
        itemName.value !== null &&
        itemPrice.value !== null &&
        categoryId.value !== null
      ) {
        if (!buyInfoList.value) return;
        await store
          .dispatch("createItemStore", {
            categoryId: categoryId.value,
            name: itemName.value,
            price: itemPrice.value,
            uid: uid.value,
            sort: buyInfoList.value.length + 1,
          })
          .then(() => {
            itemName.value = null; //【課題→解決】awaitがないとstore終了前に処理されている。await storeだけでよいと思っている。
            itemPrice.value = null;
            categoryId.value = null;
            itemErrors.value.name = false;
            itemErrors.value.price = false;
            itemErrors.value.category = false;
          });
      } else {
        if (itemName.value === null) itemErrors.value.name = true;
        if (itemPrice.value === null) itemErrors.value.price = true;
        if (categoryId.value === null) itemErrors.value.category = true;
      }
    };

    const changeItemNameUi = async (buyInfoId: ID, name: string) => {
      if (name.length > 10) return;
      store.dispatch("changeItemNameStore", {
        buyInfoId,
        name,
        uid: uid.value,
      });
    };

    const changeItemPriceUi = (buyInfoId: ID, price: number) => {
      if (price > 9999) return;
      store.dispatch("changeItemPriceStore", {
        buyInfoId,
        price,
        uid: uid.value,
      });
    };

    const deleteItemUi = async (id: ID) => {
      await store
        .dispatch("deleteItemStore", {
          uid: uid.value,
          buyInfoId: id,
        })
        .then(() => {});
    };

    const sortUpItemUi = (
      targetBuyinfoId: ID,
      index: number,
      prevBuyInfoId: ID | undefined,
      categoryBuyInfoList: BuyInfoList
    ) => {
      if (index === 0) return;
      if (buyInfoList.value === undefined) return;
      if (prevBuyInfoId === undefined) return;

      store.dispatch("sortUpItemStore", {
        buyInfoList: [...buyInfoList.value],
        categoryBuyInfoList: categoryBuyInfoList,
        activeCategory: activeCategory.value,
        targetBuyinfoId,
        prevBuyInfoId,
        targetIndex: index,
        prevIndex: index - 1,
        uid: uid.value,
      });
    };

    const sortDownItemUi = (
      targetBuyinfoId: ID,
      index: number,
      nextBuyInfoId: ID | undefined,
      categoryBuyInfoList: BuyInfoList
    ) => {
      if (buyInfoList.value === undefined) return;
      if (nextBuyInfoId === undefined) return;
      if (index === buyInfoList.value.length - 1) return;

      store.dispatch("sortDownItemStore", {
        buyInfoList: [...buyInfoList.value],
        categoryBuyInfoList: categoryBuyInfoList,
        activeCategory: activeCategory.value,
        targetBuyinfoId,
        nextBuyInfoId,
        targetIndex: index,
        nextIndex: index + 1,
        uid: uid.value,
      });
    };

    return {
      buyInfoList,
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
      uid,
      newItem,
      itemErrors,
      errorPrice,
      sortUpItemUi,
      sortDownItemUi,
      categoryBuyInfoList,
      resultMessage,
    };
  },
});
</script>
<style lang="scss">
.list {
  display: block;
}
.list_active_newItem {
  height: 480px;
}
.list_inActive_newItem {
  height: 670px;
}

@media screen and(max-height:670px) and(max-width:420px) {
  .list {
    display: block;
    overflow-y: scroll;
    // height: 250px;
  }
  .list_active_newItem {
    height: 250px;
  }
  .list_inActive_newItem {
    height: 440px;
  }
}
</style>
