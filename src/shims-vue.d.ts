/* eslint-disable */

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
