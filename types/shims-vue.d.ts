/* eslint-disable */
// import { Store } from "vuex";
// import { State } from "../src/store/store";

// declare module '@vue/runtime-core' {
  // declare your own store states
  // provide typings for `this.$store`
//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }


declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
  // interface Vue {
  //   $store: Vuex.store<any>, // Store が any になっているのでこの部分は妥協する
  //   $state: Store.State // State はこうすることによって型定義が守られる
  // }
  // interface ComponentCustomProperties {
  //   $store: Store<State>
  // }
}
// declare module 'vue/types/vue' {//かきたす
//   interface Vue {
//     $store: any
//   }
// }