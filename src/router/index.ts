// import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import test from "../view/test.vue";
import top from "../view/top.vue";
import category from "../view/category.vue";
import item from "../view/item.vue";
import buyList from "../view/buy-list.vue";
import itemList from "../view/item-list.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // name: "top",
    component: top,
  },

  {
    path: "/test",
    // name: "top",
    component: test,
  },
  {
    path: "/category",
    // name: "top",
    component: category,
  },
  {
    path: "/item",
    // name: "top",
    component: item,
  },
  {
    path: "/buyList",
    // name: "top",
    component: buyList,
  },
  {
    path: "/itemList",
    // name: "top",
    component: itemList,
  },
];

const router = createRouter({
  //createWebHistoryを以下に変更することにより、リロード時404エラーなくなった

  history: createWebHashHistory(),
  routes,
});

export default router;
