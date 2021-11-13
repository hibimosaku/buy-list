<template>
  <input
    v-model="val.item.name"
    @change="changeItemNameUi(val.buyInfoId, val.item.name)"
    type="text"
    class="form-control col-6"
    placeholder="品目名"
    aria-label="品目名"
    aria-describedby="button-addon2"
  />
  <input
    v-model="val.item.price"
    @change="changeItemPriceUi(val.buyInfoId, val.item.price)"
    type="number"
    class="form-control col-2"
    placeholder="価格"
    aria-label="価格"
    aria-describedby="button-addon2"
  />
  <button
    @click="deleteItemUi(val.buyInfoId)"
    class="btn btn-outline-secondary col-2"
    type="button"
    id="button-addon2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
      />
      <path
        fill-rule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      />
    </svg>
  </button>
  <div
      class="form-control col-2"
  >
    <div>
      <div @click="orderUpItem(val.buyInfoId,index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
        </svg>
      </div>
      <div @click="orderDownItem(index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg>
      </div>
    </div>
  </div>



</template>

<script>
export default {
  props: {
    val: {},
    index:String
  },
  emits: ["deleteItemUi", "changeItemNameUi", "changeItemPriceUi","orderUpItem","orderDownItem"],
  setup(_props, { emit }) {
    const deleteItemUi = (id) => {
      emit("deleteItemUi", id);
    };
    const changeItemNameUi = (id, name) => {
      emit("changeItemNameUi", id, name);
    };
    const changeItemPriceUi = (id, price) => {
      emit("changeItemPriceUi", id, price);
    };
    const orderUpItem=(id,index)=>{
      emit("orderUpItem",id,index)
    }
    const orderDownItem=(index)=>{
      emit("orderDownItem",index)
    }

    return { deleteItemUi, changeItemNameUi, changeItemPriceUi,orderUpItem,orderDownItem };
  },
};
</script>
