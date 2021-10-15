<template>
  <navComponent></navComponent>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navComponent from "../component/nav.vue";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {},
});
</script>
