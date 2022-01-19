<template>
  <td>{{ val.item.name }}</td>
  <td>{{ val.item.price }}</td>
  <td>
    {{ val.buyResultDay != null ? val.buyResultDay.slice(0, 4) : "－" }}<br />{{
      val.buyResultDay != null ? val.buyResultDay.slice(4, 10) : ""
    }}
  </td>
  <td>
    <button
      type="button"
      :class="{
        'btn btn-primary btn-sm': val.buyRequest === false,
        'btn btn-light btn-sm': val.buyRequest != false,
      }"
      @click="changeBuyRequestDoUi(false, val.buyInfoId)"
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
      :class="{
        'btn btn-primary btn-sm': val.buyRequest === true,
        'btn btn-light btn-sm': val.buyRequest != true,
      }"
      @click="changeBuyRequestDoUi(true, val.buyInfoId)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-bag-check"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
        />
        <path
          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
        />
      </svg>
    </button>
  </td>
  <td>
    <select
      class="form-control form-control-sm"
      style="appearance: none; width: 25px"
      @change="changeBuyRequestNumUi(val.buyRequestNum.num, val.buyInfoId)"
      v-model="val.buyRequestNum.num"
      :disabled="
        val.buyRequest === false || val.buyRequest === null ? true : false
      "
    >
      <option style="font-size: 5px" v-for="num in 9" :key="num">
        {{ num }}
      </option>
    </select>
  </td>
</template>

<script lang="ts">
import { ID } from '../../model/id.value';
export default {
  props: {
    val: {},
  },
  emits: ["changeBuyRequestDoUi", "changeBuyRequestNumUi"],
  setup(_props: any, { emit }: any) {
    const changeBuyRequestDoUi = (request: boolean, buyInfoId: ID) => {
      emit("changeBuyRequestDoUi", request, buyInfoId);
    };
    const changeBuyRequestNumUi = (
      buyRequestNum: number,
      buyInfoId: string
    ) => {
      emit("changeBuyRequestNumUi", buyRequestNum, buyInfoId);
    };
    return { changeBuyRequestDoUi, changeBuyRequestNumUi };
  },
};
</script>
