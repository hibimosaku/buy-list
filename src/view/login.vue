<template>
  <div class="d-flex justify-content-between bg-primary align-items-center" style="height:40px">
    <h6 class="p-2 bd-highlight text-white" style="margin:0;">買物アプリ</h6>
  </div>
  <label for="inputEmail" class="visually-hidden" style="margin-top:20px">メールアドレス</label>
  <input type="email" id="inputEmail" class="form-control form-control-sm" placeholder="メールアドレス" v-model="mail">
  <label for="inputPassword" class="visually-hidden">パスワード</label>
  <input type="password" id="inputPassword" class="form-control form-control-sm" placeholder="パスワード" v-model="pw">
  <button class="w-100 btn btn-sm btn-primary" type="submit" @click="login">ログイン</button>

  <hr>
  <div class="text-center">
    ～<router-link to="/signUp">初めての方</router-link>～<br>
    ～<router-link to="/forgetPw">パスワード忘れた方</router-link>～
  </div>
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
    const mail = ref<string>();
    const pw = ref<string>();

    const router = useRouter();

    const login = () => {
      if (mail.value === undefined || pw.value === undefined) {
        alert("メールアドレスorパスワードが入力されていません");
        return;
      }
      AuthUseCase.loginUc(mail.value as string, pw.value as string)
        .then(() => {
          router.push("/category");
        })
        .catch(() => {
          alert("メールアドレス、パスワードが間違っています。");
          return;
        });
    };

    return {
      login,
      mail,
      pw,
    };
  },
});
</script>
