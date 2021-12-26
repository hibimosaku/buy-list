import { computed, ref } from "vue";
import { BuyInfo, BuyInfoList } from "../../model/buy-info.model";

export const useFilterBuyList=()=>{
  const buyInfoList = ref<BuyInfoList>();
  const activeCategory = ref("all");
  const filterStatus = ref<string>("all" || "no" || "want");
  const search = ref("");
  const waitingCount=ref(0)

  const filterbuyList = computed((): BuyInfoList | null => {    
    let result: BuyInfoList;
    if (buyInfoList.value === undefined) return null;

    function kanaToHira(str:string) {
      return str.replace(/[\u30a1-\u30f6]/g, function(match) {
          var chr = match.charCodeAt(0) - 0x60;
          return String.fromCharCode(chr);
      });    
    }

    function hiraToKana(str:string) {
        return str.replace(/[\u3041-\u3096]/g, function(match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }
    const searchByKana=kanaToHira(search.value)
    const searchByHira=hiraToKana(search.value)

    if (activeCategory.value === "all" && search.value === "") {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (filterStatus.value === "all") return v != null;
        if (filterStatus.value === "no") return v.buyRequest === false;
        if (filterStatus.value === "want") return v.buyRequest === true;
        return null;
      });
      return result;
    }

    if (activeCategory.value === "all" && search.value !== "") {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (filterStatus.value === "all" && buyInfoList.value){
          return v! !== null && (v.item.name.includes(String(searchByKana)) || v.item.name.includes(String(searchByHira))) 
        }
        if (filterStatus.value === "no")
          return (
            v.buyRequest === false &&
            v.item.name.includes(String(search.value))
          );
        if (filterStatus.value === "want")
          return (
            v.buyRequest === true &&
            v.item.name.includes(String(search.value))
          );
        return null;
      });
      return result;    
    }

    if (activeCategory.value !== "all" && search.value === "") {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "all"
        )
          return v != null;
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "no"
        )
          return v.buyRequest === false;
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "want"
        )
          return v.buyRequest === true;
        return null;
      });
      return result;
    }

    if (activeCategory.value !== "all" && search.value !== "") {
      result = buyInfoList.value.filter((v: BuyInfo) => {
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "all"
        )
          return v != null && v.item.name.includes(String(search.value));
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "no"
        )
          return (
            v.buyRequest === false &&
            v.item.name.includes(String(search.value))
          );
        if (
          activeCategory.value === v.categoryId &&
          filterStatus.value === "want"
        )
          return (
            v.buyRequest === true &&
            v.item.name.includes(String(search.value))
          );
        return null;
      });
      return result;
    }
    
    return null;
  });

  return {
    buyInfoList,
    filterbuyList,
    search,
    activeCategory,
    filterStatus,
    waitingCount,
  }
}