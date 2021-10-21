<template>
  <div class="container fixed-bottom" style="background-color: #ffffff">
    <div class="row btn-group-sm" role="group" aria-label="Basic example">
      <button
        type="button"
        class="col btn btn-outline-primary btn"
        @click="propsMethodCategoryAll"
      >
        ALL
      </button>
      <button
        type="button"
        class="btn btn-outline-primary col"
        v-for="n in 4"
        :key="n"
        @click="propsMethodCategory(n - 1)"
      >
        {{ propsStore[n - 1].name }}
      </button>
    </div>
    <div class="row btn-group-sm" role="group" aria-label="Basic example">
      <button
        type="button"
        class="col btn btn-outline-primary"
        v-for="n in 5"
        :key="n"
        @click="propsMethodCategory(n + 3)"
      >
        {{ propsStore[n + 3].name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propsStore: Array,
  },
  emits: ["propsActiveCategory", "propsActiveCategoryAll"],
  setup(props, { emit }) {
    let propsMethodCategoryAll = () => {
      emit("propsActiveCategoryAll");
    };
    let propsMethodCategory = (index) => {
      emit("propsActiveCategory", index);
    };
    return {
      propsMethodCategoryAll,
      propsMethodCategory,
    };
  },
};
</script>

<style lang="scss"></style>
