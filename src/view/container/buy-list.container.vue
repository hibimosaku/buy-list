<template>
    <td>{{ val.item.name }}</td>
    <td>{{ val.item.price }}</td>
    <td>
      {{ val.buyDay != null ? val.buyDay : "－" }}
    </td>
    <td>
      <button
        type="button"
        v-bind:class="{
          'btn btn-primary': val.itemStatus == false,
          'btn btn-light': val.itemStatus != false,
        }"
        @click="changeItemStatusNo(val, index)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bag-x"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"
          />
          <path
            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
          />
        </svg>
      </button>
    </td>

    <td>
      <button
        type="button"
        v-bind:class="{
          'btn btn-primary': val.itemStatus == true,
          'btn btn-light': val.itemStatus != true,
        }"
        @click="changeItemStatusWant(val, index)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
      </button>
    </td>

</template>

<script>
export default {
  props:{
    val:{},
    index:Number
  },
  emits:["changeItemStatusNo","changeItemStatusWant"],
  setup(props,{emit}) {
    let changeItemStatusNo=(val,index)=>{
      emit("changeItemStatusNo",val, index)
    }
    let changeItemStatusWant=(val,index)=>{
      emit("changeItemStatusWant",val, index)
    }
    return {changeItemStatusNo,changeItemStatusWant}
  },
}
</script>