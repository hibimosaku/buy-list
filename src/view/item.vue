<template>
  <navComponent></navComponent>

  <div
    class="text-success"
    style="margin-bottom: 10px"
    @click="newItem == true ? (newItem = false) : (newItem = true)"
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
    <div
      :class="{
        'input-group input-group-sm mb-3': itemErrors.name == false,
        'input-group input-group-sm': itemErrors.name == true,
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
        'input-group input-group-sm mb-3': itemErrors.price == false,
        'input-group input-group-sm': itemErrors.price == true,
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
        'input-group input-group-sm mb-3': itemErrors.category == false,
        'input-group input-group-sm': itemErrors.category == true,
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

  <div class="container" style="margin: 10px 0px">
    <div class="row">
      <div class="col-6">品目名</div>
      <div class="col-2">価格</div>
      <div class="col-2">削除</div>
      <div class="col-2" style="font-size: 12px">並び替え</div>
    </div>
  </div>

  <div class="text-danger" v-if="errPriceInfo">
    エラーが発生しました。管理者への問い合わせお願いします。
  </div>

  <!-- :current="val" -->

  <!-- :next="categoryBuyInfoList[index + 1]"
          :prev="categoryBuyInfoList[index - 1]" -->

  <div v-for="(val, index) in categoryBuyInfoList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group" style="margin-bottom: 10px">
        <!-- 【課題】categoryBuyInfoList[index +1]==undefined.buyInfoIdならエラーでUI表示されなかったなぜ？ -->
        <itemComponent
          :val="val"
          :categoryBuyInfoList="categoryBuyInfoList"
          :index="index"
          :nextBuyInfoId="
            categoryBuyInfoList[index + 1] == undefined
              ? undefined
              : categoryBuyInfoList[index + 1].buyInfoId
          "
          :prevBuyInfoId="
            categoryBuyInfoList[index - 1] == undefined
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
        style="margin-bottom: 10px"
        v-if="errPriceUi[1] == true && errPriceUi[0] == val.buyInfoId"
      >
        価格の限度額を超えています（0～9999円）
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
import { store } from "../store/store";

import navComponent from "./component/nav.component.vue";
import categoryComponent from "./component/category-list.component.vue";
import itemComponent from "./component/item.component.vue";

import { BuyInfoList } from "../model/buy-info.model";

import { commonMount } from "./func/common-mount";

export default defineComponent({
  components: {
    navComponent,
    categoryComponent,
    itemComponent,
  },
  //refに頼らない。
  setup() {
    let itemName = ref<string | null>();
    let itemPrice = ref<number | null>();
    let categoryId = ref<string | null>();
    let buyInfoList = ref<BuyInfoList>();
    let activeCategory = ref("all");
    let { categorys, uid } = commonMount();
    let newItem = ref<boolean>(false);
    let itemErrors = ref({ name: false, price: false, category: false });
    let errorPrice = ref();
    let errPriceUi = ref<[string | null, boolean]>([null, false]);
    // let nextIndex=ref()
    // let prevIndex=ref()

    onMounted(() => {
      buyInfoList.value = store.getters.getBuyInfoList; //computed
      errorPrice.value = store.getters.getErrorchangeItemPrice;
    });

    // onUpdated(()=>{
    //   buyInfoList.value = store.getters.getBuyInfoList; //computed
    //   errorPrice.value = store.getters.getErrorchangeItemPrice;
    // })

    const errPriceInfo = computed((): any => {
      if (store.getters.getErrorChangeItemPrice) {
        buyInfoList.value = store.getters.getBuyInfoList; //【課題】これ反映している？
        return store.getters.getErrorChangeItemPrice;
      }
    });

    const categoryBuyInfoList = computed(() => {
      if (activeCategory.value == "all") {
        return buyInfoList.value;
      } else {
        let result = buyInfoList.value?.filter((v) => {
          return v.categoryId == activeCategory.value;
        });
        return result;
      }
    });

    const createItemUi = () => {
      if (itemName.value == null) itemErrors.value.name = true;
      if (itemPrice.value == null) itemErrors.value.price = true;
      if (categoryId.value == null) itemErrors.value.category = true;
      if (!buyInfoList.value) {
        return;
      }

      store
        .dispatch("createItemStore", {
          categoryId: categoryId.value,
          name: itemName.value,
          price: itemPrice.value,
          uid: uid.value,
          sort: buyInfoList.value.length + 1,
        })
        .then(() => {
          console.log("i0");
          buyInfoList.value = store.getters.getBuyInfoList;
          itemName.value = null;
          itemPrice.value = null;
          categoryId.value = null;
        })
        .catch(() => {});

      if (store.getters.getErrorCreateItem) {
        alert("登録に失敗しました");
        return;
      }
    };

    const changeItemNameUi = (buyInfoId: string, name: string) => {
      store.commit("changeItemNameStore", {
        buyInfoId,
        name,
        uid: uid.value,
      });
      if (store.getters.getErrorCreateItem) {
        console.log("1");
        alert("登録に失敗しました");
        return;
      }
    };

    const changeItemPriceUi = (buyInfoId: string, price: number) => {
      if (price > 10000) {
        errPriceUi.value = [buyInfoId, true];
        return;
      } else {
        errPriceUi.value = [null, false];
        store.dispatch("changeItemPriceStore", {
          //catchは使えない
          buyInfoId,
          price,
          uid: uid.value,
        });
      }
    };

    const onActiveCategory = (id: string) => {
      activeCategory.value = id;
    };

    const deleteItemUi = (id: string) => {
      store.commit("deleteItemStore", {
        uid: uid.value,
        buyInfoId: id,
      });
      alert("削除しました");
    };

    // const sortUpItemUi = (id: string | undefined, idTarget: string | undefined) => {//入れ替えたいIDあればOK
    const sortUpItemUi = (
      targetBuyinfoId: string,
      index: number,
      prevBuyInfoId: string | undefined,
      categoryBuyInfoList: BuyInfoList
    ) => {
      if (index == 0) return;
      if (buyInfoList.value == undefined) return;
      if (prevBuyInfoId == undefined) return;

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
      targetBuyinfoId: string,
      index: number,
      nextBuyInfoId: string | undefined,
      categoryBuyInfoList: BuyInfoList
    ) => {
      if (buyInfoList.value == undefined) return;
      if (nextBuyInfoId == undefined) return;
      if (index == buyInfoList.value.length - 1) return;

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

    // const sortDownItemUi = (id: string, index: number) => {
    //   if (buyInfoList.value == undefined) return;

    //   if (activeCategory.value == "all") {
    //     if (buyInfoList.value.length - 1 == index) return;

    //     let a; //clickしたbuyInfo情報
    //     let b; //clickの前のbuyInfo情報
    //     if (buyInfoList.value != undefined) {
    //       a = buyInfoList.value[index];
    //       b = buyInfoList.value[index + 1];

    //       if (b != undefined) {
    //         buyInfoList.value[index] = b;
    //         buyInfoList.value[index + 1] = a;
    //         if (uid.value) {
    //           BuyInfoRepository.updateItemListRep(buyInfoList.value, uid.value);
    //         }
    //       }
    //     }
    //   } else {
    //     if (
    //       categoryBuyInfoList.value != undefined &&
    //       categoryBuyInfoList.value.length - 1 == index
    //     )
    //       return;
    //     let filterBuyList: BuyInfoList;
    //     //categoryのみのリスト作成
    //     filterBuyList = buyInfoList.value.filter((v, k) => {
    //       return v.categoryId == activeCategory.value;
    //     });
    //     //クリックした下のbuyInfoIdを取得
    //     let nextBuyInfoId: string;
    //     filterBuyList.forEach((v: BuyInfo, k: number) => {
    //       if (v.buyInfoId == id) {
    //         nextBuyInfoId = filterBuyList[k + 1].buyInfoId;
    //       }
    //     });

    //     //category分けされいていないbuyInfoList情報取得
    //     let targetIndex; //clickした配列番号
    //     let nextIndex; //click後の配列番号
    //     //buyInfoListでの
    //     buyInfoList.value.forEach((v: BuyInfo, k) => {
    //       if (v.buyInfoId == id) {
    //         targetIndex = k;
    //       }
    //       if (v.buyInfoId == nextBuyInfoId) {
    //         nextIndex = k;
    //       }
    //     });

    //     if (
    //       targetIndex !== undefined &&
    //       nextIndex != undefined &&
    //       buyInfoList != undefined &&
    //       uid.value != undefined
    //     ) {
    //       [buyInfoList.value[targetIndex], buyInfoList.value[nextIndex]] = [
    //         buyInfoList.value[nextIndex],
    //         buyInfoList.value[targetIndex],
    //       ];
    //       BuyInfoRepository.updateItemListRep(buyInfoList.value, uid.value);
    //     }
    //   }
    // };

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
      errPriceInfo,
      errPriceUi,
      // nextIndex,
      // prevIndex
    };
  },
});
</script>
