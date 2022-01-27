<template>
  <nav class="nav bg-primary">
    <a class="nav-link text-white" aria-current="page">買物アプリ</a>
  </nav>
  <label for="inputEmail" class="visually-hidden" style="margin-top: 20px"
    >登録したメールアドレス</label
  >
  <input
    type="email"
    id="inputEmail"
    class="form-control form-control-sm"
    placeholder="メールアドレス"
    v-model="mail"
  />
  <button class="w-100 btn btn-sm btn-primary" type="submit" @click="forgetPw">
    pw再設定メール送信
  </button>
  <router-link to="/login">戻る</router-link>
</template>

<script lang="ts">
import navComponent from "../common/nav.component.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    const store = useStore()

    const mail = ref<string>();

    const router = useRouter();

    const forgetPw = () => {
      if (mail.value === undefined) {
        alert("メールアドレスが入力されていません");
        router.push("/login");
        return;
      }
      store
        .dispatch("forgetPwStore", mail.value)
        .then((val) => {
          alert("メールが送信されましたので、手続きお願いします。");
          router.push("/category");
        })
        .catch((error) => {
          alert("メールアドレスが間違っている可能性がございます。");
          return;
        });
    };

    return {
      forgetPw,
      mail,
    };
  },
});
</script>
