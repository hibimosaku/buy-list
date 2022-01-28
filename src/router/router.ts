import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import login from "../view/login/login.vue";
import category from "../view/category/category.vue";
import item from "../view/item/item.vue";
import buyList from "../view/buy-list/buy-list.vue";
import buyAct from "../view/buy-act/buy-act.vue";
import signUp from "../view/signUp/signUp.vue";
import common from "../view/common/common.vue";
import forgetPw from "../view/forget-pw/forget-pw.vue";

// import { getAuth } from "firebase/auth";

import { onAuthStateChanged } from "@firebase/auth";
import { load } from "../view/common/load.func";
// import { useStore } from 'vuex'
import { store } from "../store/store";
import { Category } from "../model/category.model";
import { getAuth } from "firebase/auth";

//↓【課題→解決】本当はおきたくない。webのsorceで丸見え
// const firebaseConfig = {
//   apiKey: "AIzaSyA3ZoDiyxNZBWFgntlnBEcrFkfAgOo2RIE",
//   authDomain: "buy-list-cf.firebaseapp.com",
//   projectId: "buy-list-cf",
//   storageBucket: "buy-list-cf.appspot.com",
//   messagingSenderId: "1087310780588",
//   appId: "1:1087310780588:web:1c8d10b9943ea3d7296709",
//   measurementId: "G-0K9W3P389E",
// };
// initializeApp(firebaseConfig);
// const store = useStore()

// const auth: any = null;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/forgetPw",
    name: "forgetPw",
    component: forgetPw,
  },
  {
    path: "/",
    component: common,
    name: "common",
    children: [
      {
        path: "/item",
        name: "item",
        component: item,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/category",
        name: "category",
        component: category,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/buyList",
        name: "buyList",
        component: buyList,
        meta: { requiresAuth: true },
      },
      {
        path: "/buyAct",
        name: "buyAct",
        component: buyAct,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../view/notfound/notfound.vue"),
    meta: {
      titele: "NotFoundページ",
      description: "NotFoundページの説明",
    },
  },

  // {
  //   path: "/item",
  //   name: "item",
  //   component: item,
  //   meta: { requiresAuth: true },
  // },
];

const router = createRouter({
  //createWebHistoryを以下に変更することにより、リロード時404エラーなくなった
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

// 認証状態をチェック
router.beforeEach((to, from, next) => {
  // if (!auth) auth = getAuth(); //configが解決した、まだ理解していない
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const BuyInfoList = store.getters.getBuyInfoList;
  const categorys: Array<Category> = store.getters.getCategorys;
  //auth→getauthに変える
  if (requiresAuth) {
    onAuthStateChanged(getAuth(), async (user) => {
      //【課題】リポジトリにもっていく？
      if (user && BuyInfoList && categorys.length === 9) {
        next();
      } else if (user) {
        await load(user.uid);
        await store.commit("registerAuth", user.uid);
        next();
      } else {
        router.push("./login");
      }
    });
  } else {
    next();
  }
});

export default router;
