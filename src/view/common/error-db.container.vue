<template>
  <!-- <div class="text-danger" v-if="isErrItem || isErrCategory || isErrBuyList || isErrBuyAct">
    エラーが発生しました。管理者への問い合わせお願いします。
  </div> -->

  <teleport to="#error">
    <transition name="fade">
      <div
        v-if="isErrItem || isErrCategory || isErrBuyList || isErrBuyAct"
        @click="onErrFalse"
        class="alert alert-light"
        role="alert"
        style="
          position: fixed
          z-index: 2000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.7);
        "
      ></div>
    </transition>
    <transition
      name="modal"
      enter-active-class="animate__animated animate__fadeInDown"
    >
      <div
        v-if="isErrItem || isErrCategory || isErrBuyList || isErrBuyAct"
        @click="onErrFalse"
        style="
          position: fixed;
          z-index: 2500;
          top: 0;
          left: 10%;
          background-color: #fefefe;
          margin: 10% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          text-align: center;
        "
      >
        エラーが発生しました。<br />管理者への問い合わせお願いします。
      </div>
    </transition>
    <!-- </div> -->
  </teleport>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { store } from "../../store/store";

export default defineComponent({
  setup() {
    const modal = ref(false);
    const onErrFalse = () => {
      store.commit("isErrorDbFalse");
    };

    const isErrItem = computed((): boolean => {
      if (store.getters.getErrorItem === true) {
        return true;
      }
      return false;
    });

    const isErrCategory = computed((): boolean => {
      if (store.getters.getIsErrorCategory === true) {
        return true;
      }
      return false;
    });

    const isErrBuyList = computed((): boolean => {
      if (store.getters.getErrorBuyList === true) {
        return true;
      }
      return false;
    });

    const isErrBuyAct = computed((): boolean => {
      if (store.getters.getErrorBuyList === true) {
        return true;
      }
      return false;
    });

    return {
      isErrItem,
      isErrCategory,
      isErrBuyList,
      isErrBuyAct,
      modal,
      onErrFalse,
    };
  },
});
</script>
<style lang="scss">
/* .fade-leave-active {
  transition: opacity 5s ease;
} */

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-leave-to {
  opacity: 0;
}

.modal-leave-from {
  opacity: 1;
}
.modal-leave-active {
  transition: opacity 1s ease;
}
.modal-leave-to {
  opacity: 0;
}

/* .fade-leave-to {
  opacity: 0;
} */
</style>
