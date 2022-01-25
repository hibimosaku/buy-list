import { useStore } from 'vuex'

import { Category, createCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

//分類登録 async
export async function changeCategoryUc(
  name: string,
  categoryId: string,
  uid: string
  // state:State,
): Promise<Category> {
  try {
    const category = createCategory(categoryId, name);
    await CategoryRepository.updateCategoryRep(category, uid);
    return category;
  } catch (e) {
    store.commit("isErrorDbCategory");
    console.error(`errMethod:changeCategoryUi,${e}`);
    throw new Error();
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
