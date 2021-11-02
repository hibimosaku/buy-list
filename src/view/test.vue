<template>
aaa

  <table>
    <tr
      v-for="fruit in fruitsDisp"
      :key="fruit"
      draggable="true"
      @dragstart="dragstart(fruit, $event)"
      @dragenter="dragenter(fruit)"
      @dragover.stop.prevent="dragover"
      @dragend.stop.prevent="dragend"
    >
      <td>{{ fruit.name }}</td>
      <td>{{ fruit.price }}</td>
    </tr>
  </table>
</template>
<script lang="ts">
import { ref,defineComponent, computed } from 'vue'
// import draggable from 'vuedraggable'

export default defineComponent ({
  // components:{
  //   draggable
  // },
  setup() {
//参考URL：https://zukucode.com/2020/05/vue-drag-drop-order.html

    let fruits:any=ref()
    let dragging=ref(false)
    let enabled=ref(true)

    fruits.value= [
        { id: 1, name: 'りんご', price: 200, order: 1 },
        { id: 2, name: 'みかん', price: 50, order: 2 },
        { id: 3, name: 'ばなな', price: 100, order: 3 },
    ]


    let fruitsDisp=computed(()=>{
      return fruits.value.sort((a:any, b:any) => a.order - b.order);
    })

    let draggingItem:any= ref()
    draggingItem.value=null

    let dragstart=(item:any, e:any)=> {
      draggingItem.value = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = 'move'; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
    }
    let dragenter=(item:any)=> {
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.order, draggingItem.value.order] = [draggingItem.value.order, item.order];
    }
    let dragover=(e:any)=>{
      e.dataTransfer.dropEffect = 'move'; // 移動モードに設定
    }
    let dragend=(e:any)=>{
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      draggingItem.value = null; // ドラッグ中の要素をクリア
    }



    return {
      fruits,
      dragging,
      enabled,
fruitsDisp,
      draggingItem,
      dragstart,
      dragenter,
      dragover,
      dragend
    }
  },
})
</script>