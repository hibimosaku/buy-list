import { onMounted, ref } from "@vue/runtime-dom";
import { store } from "../../store/store";

export const commonMount = () => {
  let categorys = ref<Array<string> | null>();
  let uid = ref<string>(); //【課題】refで成立

  onMounted(() => {
    uid.value = store.getters.getUid;
    categorys.value = store.getters.getCategorys;
    if(store.getters.getErrorGetCategory){
      alert('categoryの取得を失敗しました(error名：getErrorGetCategory')
    }
  });

  return {
    categorys,
    uid,
  };
};
