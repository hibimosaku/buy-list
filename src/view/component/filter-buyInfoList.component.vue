<template>
  <div class="col-12" style="margin: 10px 0px">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        @click="changefilName(filterType[0])"
        checked
      />
      <label class="form-check-label" for="flexRadioDefault1">
        <slot name="all"></slot>
      </label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        @click="changefilName(filterType[1])"
      />
      <label class="form-check-label" for="flexRadioDefault2">
        <slot name="no"></slot>
      </label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        @click="changefilName(filterType[2])"
      />
      <label class="form-check-label" for="flexRadioDefault2">
        <slot name="want"></slot>
      </label>
    </div>
  </div>
</template>
<script lang="ts">

export default {
  props: {
    filterType: Array,
  },
  emits: ["changefilName"],
  setup(_props: any, { emit }: any) {
    // const jsonpAdapter = require('axios-jsonp');

    const changefilName = (name: string) => {
      emit("changefilName", name);
    };
    return {
      changefilName,
    };
  },
};
</script>
