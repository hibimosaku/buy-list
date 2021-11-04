<template>
  <input
    v-model="val.item.name"
    @change="changeItemName(val.item.id, val.item.name, index)"
    type="text"
    class="form-control col-6"
    placeholder="品目名"
    aria-label="品目名"
    aria-describedby="button-addon2"
  />
  <input
    v-model="val.item.price"
    @change="changeItemPrice(val.item.id, val.item.price, index)"
    type="number"
    class="form-control col-4"
    placeholder="価格"
    aria-label="価格"
    aria-describedby="button-addon2"
  />
  <button
    @click="deleteItem(val.item.id, index)"
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
</template>

<script>
export default {
  props: {
    val: {},
    index: Number,
  },
  emits: ["deleteItem", "changeItemName", "changeItemPrice"],
  setup(_props, { emit }) {
    let deleteItem = (id, index) => {
      emit("deleteItem", id, index);
    };
    let changeItemName = (name, index) => {
      emit("changeItemName", name, index);
    };
    let changeItemPrice = (val, index) => {
      emit("changeItemPrice", val, index);
    };

    return { deleteItem, changeItemName, changeItemPrice };
  },
};
</script>
