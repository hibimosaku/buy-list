//entity

import { createCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

//分類登録
export function saveCategoryUc(
  name: string,
  categoryId: string,
  userId: string
): void {
  const category = createCategory(categoryId, name);
  CategoryRepository.newSaveCategory(category, userId);

  // const allCategorys = CategoryRepository.getCategory(userId);
  // return allCategorys;
}

export function getCategoryUc(userId: string) {
  let result = CategoryRepository.getCategory(userId).then((value: any) => {
    return value;
  });
  console.log("categoryUCから", result);
  return result;
}
