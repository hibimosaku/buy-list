<template>
  <div class="container fixed-bottom" style="background-color: #ffffff">
    <div class="row btn-group-sm" role="group" aria-label="Basic example">
      <button
        type="button"
        :class="{
          'col btn btn-outline-primary active': activeCategory == 'all',
          'col btn btn-outline-primary': activeCategory != 'all',
        }"
        @click="onActiveCategory('all')"
      >
        ALL
      </button>
      <button
        type="button"
        v-for="n in 4"
        :key="n"
        :class="{
          'col btn btn-outline-primary active': activeCategory == n - 1,
          'col btn btn-outline-primary': activeCategory != n - 1,
        }"
        @click="onActiveCategory(n - 1)"
      >
        {{ categorys[n - 1].name }}
      </button>
    </div>
    <div class="row btn-group-sm" role="group" aria-label="Basic example">
      <button
        type="button"
        class="col btn btn-outline-primary"
        v-for="n in 5"
        :key="n"
        @click="onActiveCategory(n + 3)"
      >
        {{ categorys[n + 3].name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    categorys: Array,
    activeCategory: String,
  },
  emits: ["onActiveCategory"],
  setup(_props: any, { emit }: any) {
    const onActiveCategory = (index: number) => {
      emit("onActiveCategory", String(index));
    };
    return {
      onActiveCategory,
    };
  },
};
</script>

<style lang="scss"></style>
