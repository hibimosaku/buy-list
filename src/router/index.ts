// import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import top from "../view/top.vue";
import category from "../view/category.vue";
import item from "../view/item.vue";
import buyList from "../view/buy-list.vue";
import buyRequest from "../view/buy-request.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // name: "top",
    component: top,
  },

  {
    path: "/category",
    // name: "top",
    component: category,
    // redirect:'/item'
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
    path: "/buyRequest",
    // name: "top",
    component: buyRequest,
  },
];

const router = createRouter({
  //createWebHistoryを以下に変更することにより、リロード時404エラーなくなった

  history: createWebHashHistory(),
  routes,
});

export default router;
