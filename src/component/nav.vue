<template>
  <ul class="nav justify-content-center">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">TOP</a>
    </li>
    <li class="nav-item">
      <router-link to="/item" class="nav-link">品目</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/category" class="nav-link">分類</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/itemList" class="nav-link">買い物リスト</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/buyList" class="nav-link">買い物リクエスト</router-link>
    </li>

    <li class="nav-item">
      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
        >Disabled</a
      >
    </li>
  </ul>
</template>
