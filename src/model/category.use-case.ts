import { store } from "../store/store";

import { createCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

//分類登録 async
export async function changeCategoryUc(
  name: string,
  categoryId: string,
  uid: string
  // state:State,
): Promise<void> {
  try {
    const category = createCategory(categoryId, name);
    await CategoryRepository.updateCategoryRep(category, uid);
  } catch (e) {
    store.commit("isErrorDbCategory");
    console.error(`errMethod:changeCategoryUi,${e}`);
  }
}

export function getCategoryUc(uid: string) {
  const result = CategoryRepository.getCategoryRep(uid)
    .then((value) => {
      return value;
    })
    .catch((e) => {
      store.commit(`isErrorDbCategory`);
      console.error(`errMethod:getBuyInfoList,${e}`);
    });
  return result;
}
