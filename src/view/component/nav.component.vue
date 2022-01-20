<template>
  <header
    class="d-flex justify-content-between bg-primary align-items-center"
    style="height: 40px"
  >
    <h6 class="p-2 bd-highlight text-white" style="margin: 0">買物アプリ</h6>
    <div class="d-flex justify-content-end">
      <a class="p-2 bd-highlight text-white small" @click="signOut"
        >ログアウト</a
      >
      <a class="p-2 bd-highlight text-white small" @click="userDeleteUi"
        >退会</a
      >
    </div>
  </header>
</template>
<script lang="ts">
import router from "../../router/router";
import { store } from "../../store/store";

export default {
  setup() {
    const signOut = async () => {
      store
        .dispatch("singOutStore")
        .then(() => {
          alert("ログアウトしました");
          router.push("./login");
        })
        .catch(() => {
          alert("ログアウト失敗");
        });
    };
    const userDeleteUi = () => {
      if (confirm("退会してもよろしいでしょうか？")) {
        store
          .dispatch("userDeleteStore")
          .then(() => {
            alert("今までご利用ありがとうございました。");
            router.push("./login");
          })
          .catch(() => {
            alert("退会手続きに不備がございました");
          });
      }
    };
    return {
      signOut,
      userDeleteUi,
    };
  },
};
</script>
