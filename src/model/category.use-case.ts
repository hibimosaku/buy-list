import { store } from "../store/store";

import { createCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

//分類登録 async
export async function changeCategoryUc(
  name: string,
  categoryId: string,
  uid: string
  // state:State,
) :Promise<void>{
  try {
    const category = createCategory(categoryId, name);
    CategoryRepository.updateCategory(category, uid)
  } catch (error) {
    store.commit("errorChangeCategory");//【課題】or　alert
  }
}

export function getCategoryUc(uid: string) {
  let result = CategoryRepository.getCategory(uid).then((value) => {
    return value;
  }).catch(()=>{
    store.commit("errorGetCategory")//【課題】throw？
  })
  return result;
}
