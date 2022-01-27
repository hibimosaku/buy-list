import { computed, ref } from "vue";
import { BuyInfo, BuyInfoList } from "../../model/buy-info.model";

export const useBuyAct = () => {
  const buyInfoList = ref<BuyInfoList>();
  const activeCategory = ref();
  const filterStatus = ref<string>("all" || "buy" || "no");

  const filterbuyListRq = computed((): BuyInfoList | null => {
    let result: BuyInfoList;

    if (buyInfoList.value === undefined) return null;
    if (activeCategory.value === "all") {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (filterStatus.value === "all") return v != null;
        if (filterStatus.value === "no") return v.buyResult === false;
        if (filterStatus.value === "buy") return v.buyResult === true;
        return null;
      });
      return result;
    } else {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (activeCategory.value == v.categoryId && filterStatus.value == "all")
          return v != null;
        if (activeCategory.value == v.categoryId && filterStatus.value == "no")
          return v.buyResult == false;
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "buy"
        )
          return v.buyResult === true;
        return null;
      });
      return result;
    }
  });

  return {
    buyInfoList,
    activeCategory,
    filterStatus,
    filterbuyListRq,
  };
};
