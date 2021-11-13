<template>
  <navComponent></navComponent>
  <div class="text-success" style="margin-bottom:10px" @click="(newItem==true) ? newItem=false : newItem=true">
    <div v-if="!newItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg><span>new Item</span>
    </div>
    <div  v-if="newItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg><span>new Item</span>
    </div>
  </div>
  <div v-if="newItem">
    <div :class="{'input-group input-group-sm mb-3':itemErrors.name==false,
                  'input-group input-group-sm':itemErrors.name==true}">
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
        style="font-size:14px transform: scale(0.8);"
      />
    </div>
    <p class="text-danger small" v-if="itemErrors.name">
      品目名の入力お願いします。
    </p>
    <!-- <p class="text-danger small" v-if="itemName.length>10">
      品目名は10文字以内の入力でお願いします。
    </p> -->


    <div :class="{'input-group input-group-sm mb-3':itemErrors.price==false,
                  'input-group input-group-sm':itemErrors.price==true}">
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
        style="font-size:14px transform: scale(0.8);"
      />
    </div>
    <p class="text-danger small" v-if="itemErrors.price">
      価格の入力お願いします。
    </p>

    <div :class="{'input-group input-group-sm mb-3':itemErrors.category==false,
                  'input-group input-group-sm':itemErrors.category==true}">
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
          style="font-size:14px transform: scale(0.8);"
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
      <div class="col-2">並び替え</div>
    </div>
  </div>

      <!-- draggable="true"
      @dragstart="dragstart(val, $event)"
      @dragenter="dragenter(val, $event)"
      @dragover.stop.prevent="dragover"
      @dragend.stop.prevent="dragend" -->

  <div v-if="activeCategory === 'all'">
    <div
      v-for="(val, index) in buyInfoList"
      :key="index"
    >
      <div v-if="val">
        <div class="input-group mb-3">
          <itemComponent
            :val="val"
            @changeItemNameUi="changeItemNameUi"
            @changeItemPriceUi="changeItemPriceUi"
            @deleteItemUi="deleteItemUi"
            @orderUpItem="orderUpItem"
            @orderDownItem="orderDownItem"
          ></itemComponent>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(val, index) in buyInfoList" :key="val" :index="index">
    <div v-if="val">
      <div class="input-group mb-3" v-if="activeCategory == val.categoryId">
        <itemComponent
          :val="val"
          :index="index"
          @changeItemNameUi="changeItemNameUi"
          @changeItemPriceUi="changeItemPriceUi"
          @deleteItemUi="deleteItemUi"
          @orderUpItem="orderUpItem"
          @orderDownItem="orderDownItem"
        ></itemComponent>
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { store } from "../store/store";

import navComponent from "./component/nav.component.vue";
import categoryComponent from "./component/category-list.component.vue";
import itemComponent from "./component/item.component.vue";

import {  BuyInfo, BuyInfoList } from "../model/buy-info.model";

import {commonMount} from "./func/common-mount"
import { BuyInfoRepository } from "../model/buy-info.repository";

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
    let activeCategory = ref('all');
    let {categorys,uid}=commonMount()
    let newItem=ref<boolean>(false)
    let itemErrors=ref({name:false,price:false,category:false})
    let errorPrice=ref<boolean>(false)



    onMounted(() => {
      buyInfoList.value = store.getters.getBuyInfoList; //computed
      console.log('p10')
      watch(errorPrice, (newValue, oldValue) => {
        console.log('p9',newValue)
        if(newValue==true){
          alert('登録に失敗しました')
          return
        }else{
          return
        }
      }) 
    });


    // const itemListDisplayUi = computed((): any => {
    //   if (BuyInfoList.value) {
    //     let result: BuyInfoList = BuyInfoList.value.sort(
    //       (a: BuyInfo, b: BuyInfo) => Number(a.buyInfoId) - Number(b.buyInfoId)
    //     );
    //     store.commit("sortItemListStore", { list: result, uid: uid.value });
    //     BuyInfoList.value = store.getters.getBuyInfoList; //computed
    //     return result;
    //   }
    // });

    const createItemUi = () => {
      if(itemName.value==null) itemErrors.value.name=true
      if(itemPrice.value==null) itemErrors.value.price=true
      if(categoryId.value==null) itemErrors.value.category=true
      if(!buyInfoList.value) {return}

      store.dispatch("createItemStore", {
        categoryId: categoryId.value,
        name: itemName.value,
        price: itemPrice.value,
        uid: uid.value,
        sort:buyInfoList.value.length+1
      }).then(()=>{
        console.log('i0')
          buyInfoList.value = store.getters.getBuyInfoList;
          itemName.value = null;
          itemPrice.value = null;
          categoryId.value = null;
      }).catch(()=>{
      })

      if(store.getters.getErrorCreateItem){
        alert('登録に失敗しました')
        return
      };
    }


    const changeItemNameUi = (buyInfoId: string, name: string) => {
      
      store.commit("changeItemNameStore", {
        buyInfoId,
        name,
        uid:uid.value,
      });
      if(store.getters.getErrorCreateItem){
        console.log('1')
        alert('登録に失敗しました')
        return
      };
    
    };


    const changeItemPriceUi =async (buyInfoId: string, price: number) => {
     await  store.dispatch("changeItemPriceStore", {
        buyInfoId,
        price,
        uid:uid.value,
      })
      .then(()=>{
        console.log('p9')
      }).catch(()=>{
        errorPrice.value= store.getters.getErrorchangeItemPrice
        console.log('p10')
      })
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
      // BuyInfoList.value = store.getters.getBuyInfoList;
    };

    const orderUpItem=(id:string,index:string)=>{
      if(Number(index)==0) return
      if(buyInfoList.value==undefined) return

      if(activeCategory.value=='all'){
        let a
        let b
        if(buyInfoList.value){
          a =buyInfoList.value[Number(index)]
          b =buyInfoList.value[Number(index)-1]
          if(b!=undefined){
            buyInfoList.value[Number(index)]=b
            buyInfoList.value[Number(index)-1]=a
            if(uid.value){
              BuyInfoRepository.updateItemListRep(buyInfoList.value,uid.value)
            }
          }
        }
      }else{
          let filterBuyList:BuyInfoList
          //categoryのみのリスト作成
          filterBuyList=buyInfoList.value.filter((v,k)=>{
            return v.categoryId==activeCategory.value
          })
          //クリックした上のidを取得
          let bid:string
          filterBuyList.forEach((v:BuyInfo,k:number) => {
            if(v.buyInfoId==id){
              bid= filterBuyList[k-1].buyInfoId
            }
          });

          //対象のbuyInfo取得
          // let aa
          let aa=buyInfoList.value.filter((v)=>{
            return v.buyInfoId==id
          })
          // let bb
          let bb=buyInfoList.value.filter((v)=>{
            return v.buyInfoId==bid
          })

          let akey
          let bkey
          //並び替え
          buyInfoList.value.forEach((v:BuyInfo,k)=>{
            if(v.buyInfoId==id){
              akey=k
            }
            if(v.buyInfoId==bid){
              bkey=k
            }
          })
          if(akey && bkey && buyInfoList!=undefined){
            console.log('aaa')
            buyInfoList.value.splice(bkey,akey,...aa,...bb,)
            console.log(buyInfoList)
            // buyInfoList.value.splice(akey,bkey,...aa,...bb,)

            // buyInfoList.value[bkey]=bb
          }

          // if(buyInfoList.value==undefined) return
          // buyInfoList.value.forEach((v,k)=>{
          //   if(v.buyInfoId==id && buyInfoList.value){
          //     a=buyInfoList.value[k]
          //   }
          //   if(v.buyInfoId==bkey.value && buyInfoList.value){
          //     b=buyInfoList.value[k]
          //   }
          // })
      //a白菜、bキャベツ
      // if(buyInfoList.value){
      //     buyInfoList.value.forEach((v,k)=>{
      //       if(v.buyInfoId==a.value?.buyInfoId){
      //         aaa=k          
      //       }
      //       if(v.buyInfoId==b.value?.buyInfoId){
      //                   console.log('きゃべつ',k)
      //         bbb=k
      //       }
      //     })
      // }
          // if(buyInfoList.value){
          //   if(b!=undefined && buyInfoList.value){
          //     buyInfoList.value[Number(index)]=b
          //     buyInfoList.value[Number(index)-1]=a
          //     if(uid.value){
          //       BuyInfoRepository.updateItemListRep(buyInfoList.value,uid.value)
          //     }
          //   }
          // }


      }
    }




    const orderDownItem=(index:string)=>{
      let a
      let b
      if(buyInfoList.value!=undefined && buyInfoList.value.length-1!=Number(index)){
        a =buyInfoList.value[Number(index)]
        b =buyInfoList.value[Number(index)+1]
        if(b!=undefined){
          buyInfoList.value[Number(index)]=b
          buyInfoList.value[Number(index)+1]=a
        }
      }
    } 









    const draggingItem: any = ref();
    draggingItem.value = null;

    const dragstart = (item: any, e: any) => {
      draggingItem.value = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = "move"; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
    };
    const dragenter = (item: any, e: any) => {
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.item.id, draggingItem.value.item.id] = [
        draggingItem.value.item.id,
        item.item.id,
      ];
    };
    const dragover = (e: any) => {
      e.dataTransfer.dropEffect = "move"; // 移動モードに設定
    };
    const dragend = (e: any) => {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      draggingItem.value = null; // ドラッグ中の要素をクリア
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
      // itemListDisplayUi,
      draggingItem,
      dragstart,
      dragenter,
      dragover,
      dragend,
      uid,
      newItem,
      itemErrors,
      errorPrice,
      orderUpItem,
      orderDownItem
    
    };
  },
});
</script>
