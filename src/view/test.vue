<template>
  aaa
  <!-- @touchmove.stop.prevent="touchmove" -->

  <table>
    <tr
      v-for="fruit in fruitsDisp"
      :key="fruit"
      draggable="true"
      @touchstart="dragstart(fruit, $event)"
      @touchend="dragenter(fruit, $event)"
      @touchmove="aaa(fruit, $event)"
      @touchmove.stop.prevent="touchmove"
      @tounchend.stop.prevent="tounchend"
    >
      <td>{{ fruit.name }}</td>
      <td>{{ fruit.price }}</td>
    </tr>
  </table>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from "vue";
// import draggable from 'vuedraggable'

export default defineComponent({
  // components:{
  //   draggable
  // },
  setup() {
    //参考URL：https://zukucode.com/2020/05/vue-drag-drop-order.html

    let fruits: any = ref();
    let dragging = ref(false);
    let enabled = ref(true);

    fruits.value = [
      { id: 1, name: "りんご", price: 200, order: 1 },
      { id: 2, name: "みかん", price: 50, order: 2 },
      { id: 3, name: "ばなな", price: 100, order: 3 },
    ];

    let fruitsDisp = computed(() => {
      return fruits.value.sort((a: any, b: any) => a.order - b.order);
    });

    let draggingItem: any = ref();
    draggingItem.value = null;

    let dragstart = (item: any, e: any) => {
      draggingItem.value = item; // ドラッグ中の要素を保持
      e.draggable = true;
      e.returnValue = true;
      console.log("0", e.draggable, e);
      // e.dataTransfer.effectAllowed = "move"; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
    };
    let dragenter = (item: any, e: any) => {
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.order, draggingItem.value.order] = [
        draggingItem.value.order,
        item.order,
      ];
      e.changedTouches[0].identifier = 1;
      console.log(
        "1",
        item,
        draggingItem.value,
        e.changedTouches[0].identifier
      );
    };
    let dragover = (e: any) => {
      e.draggable = true;

      console.log("2");
      // e.dataTransfer.dropEffect = "move"; // 移動モードに設定
    };
    let dragend = (e: any) => {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      draggingItem.value = null; // ドラッグ中の要素をクリア
      console.log("3");
    };

    let aaa = (item: any, e: any) => {
      console.log(item, e);
    };

    return {
      fruits,
      dragging,
      enabled,
      fruitsDisp,
      draggingItem,
      dragstart,
      dragenter,
      dragover,
      dragend,
      aaa,
    };
  },
});
</script>
