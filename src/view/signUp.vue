<template>
  <navComponent></navComponent>
  登録
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">メールアドレス</label>
      <input
        type="email"
        class="form-control form-control-sm"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="mail"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">パスワード</label>
      <input
        type="password"
        class="form-control form-control-sm"
        id="exampleInputPassword1"
        v-model="pw"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="register">
      ログイン
    </button>
  </form>
</template>

<script lang="ts">
import navComponent from "./component/nav.component.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthUseCase } from "../model/auth.use-case";

export default defineComponent({
  components: {
    navComponent,
  },
  setup() {
    // let store = useStore(key);
    let mail = ref<string>();
    let pw = ref<string>();

    // const auth = getAuth();
    const router = useRouter();

    const register = () => {
      if (mail.value == undefined || pw.value == undefined) {
        alert("メールアドレスorパスワードが入力されていません");
        return;
      }
      AuthUseCase.signUpUc(mail.value as string, pw.value as string)
        .then((val) => {
          alert("登録完了");
          router.push("/");
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
