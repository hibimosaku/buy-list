// import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import test from "../test.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // name: "top",
    component: test,
  },

  {
    path: "/test",
    // name: "top",
    component: test,
  },
];

const router = createRouter({
  //createWebHistoryを以下に変更することにより、リロード時404エラーなくなった

  history: createWebHashHistory(),
  routes,
});

export default router;
