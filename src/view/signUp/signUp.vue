<template>
  <nav class="nav bg-primary">
    <a class="nav-link text-white" aria-current="page">買物アプリ</a>
  </nav>
  <label for="inputEmail" class="visually-hidden" style="margin-top: 20px"
    >メールアドレス</label
  >
  <input
    type="email"
    id="inputEmail"
    class="form-control form-control-sm"
    placeholder="メールアドレス"
    v-model="mail"
  />
  <label for="inputPassword" class="visually-hidden">パスワード</label>
  <input
    type="password"
    id="inputPassword"
    class="form-control form-control-sm"
    placeholder="パスワード"
    v-model="pw"
  />
  <button class="w-100 btn btn-sm btn-primary" type="submit" @click="register">
    新規登録
  </button>
  <router-link to="/login">戻る</router-link>
</template>

<script lang="ts">
import navComponent from "../common/nav.component.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthUseCase } from "../../model/auth.use-case";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    // const store = useStore(key);
    const mail = ref<string>();
    const pw = ref<string>();

    // const auth = getAuth();
    const router = useRouter();

    const register = () => {
      if (mail.value === undefined || pw.value === undefined) {
        alert("メールアドレスorパスワードが入力されていません");
        return;
      }
      AuthUseCase.signUpUc(mail.value, pw.value)
        .then((val) => {
          alert("登録完了");
          router.push("/category");
        })
        .catch((error) => {
          alert("メールアドレスorパスワードが間違っています。");
          return;
        });
    };

    return {
      register,
      mail,
      pw,
    };
  },
});
</script>
