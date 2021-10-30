<template>
  <ul class="nav nav-pills small" style="margin: 20px 0">
    <li class="nav-item">
      <router-link to="/category" class="nav-link">分類</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/item" class="nav-link">品目</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/buyList" class="nav-link">一覧</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/buyRequest" class="nav-link">買物</router-link>
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-expanded="false"
        >More</a
      >
      <ul class="dropdown-menu small">
        <li>
          <router-link to="signUp" class="dropdown-item small"
            >登録</router-link
          >
        </li>
        <li>
          <router-link to="/" class="dropdown-item small">ログイン</router-link>
        </li>
        <li>
          <a class="dropdown-item small" href="#" @click="signOut"
            >ログアウト</a
          >
        </li>
        <li>
          <a class="dropdown-item small" href="#">退会</a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script lang="ts">
// import { getAuth } from "firebase/auth";
import { AuthUseCase } from "../../model/auth.use-case";
import router from "../../router/router";
import { getAuth } from "firebase/auth";

export default {
  setup() {
    let signOut = async () => {
      const auth = await getAuth();
      const user = await auth.currentUser;
      //【課題】ログアウトしてもuid消えない
      if (user) console.log(user.uid);

      await AuthUseCase.signOUtUc;
      if (user) console.log(user.uid);
      // await signOut()
      alert("ログアウトしました");
      router.push("/");
    };
    return {
      signOut,
    };
  },
};
</script>
