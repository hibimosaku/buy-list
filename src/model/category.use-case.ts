import { createCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

//分類登録 async
export function changeCategoryUc(
  name: string,
  categoryId: string,
  uid: string
  // state,
): void {
  // try {
  //   const category = createCategory(categoryId, name);
  //   // await CategoryRepository.updateCategory(category, uid);
  // } catch (error) {
  //   state.e = error;
  // }
  // try {
  const category = createCategory(categoryId, name);
  CategoryRepository.updateCategory(category, uid);
  // } catch (error) {
  //   state.e = error;
  // }
}

export function getCategoryUc(uid: string) {
  let result = CategoryRepository.getCategory(uid).then((value) => {
    return value;
  });
  return result;
}
