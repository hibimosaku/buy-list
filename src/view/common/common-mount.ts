import { onMounted, ref } from "vue";
import { store } from "../../store/store";

export const commonMount = () => {
  const categorys = ref<Array<string> | null>();
  const uid = ref<string>();

  onMounted(() => {
    uid.value = store.getters.getUid;
    categorys.value = store.getters.getCategorys;
    if (store.getters.getErrorGetCategory) {
      alert("categoryの取得を失敗しました(error名：getErrorGetCategory");
    }
  });

  return {
    categorys,
    uid,
  };
};
