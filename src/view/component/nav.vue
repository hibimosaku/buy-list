<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand small" href="#">買物アプリ</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="signUp" class="nav-link active small"
              >登録</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link small">ログイン</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link small" href="#" @click="signOut">ログアウト</a>
          </li>
          <li class="nav-item">
            <a class="nav-link small" href="#">退会</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <ul
    class="nav nav-pills justify-content-center"
    style="margin: 20px 0 background-color: #e3f2fd;"
  >
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
      if (user) console.log("before", user.uid);

      await AuthUseCase.signOUtUc;
      if (user) console.log("after", user.uid);
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
