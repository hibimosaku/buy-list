import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Category } from "./category.model";

//【課題】エラー対応の仕方？最終的にはエラーをUIで表示がよいですよね？
//いろんなファイルを利用、非同期もあり、やり方不明

function updateCategory(category: Category, uid: string) {
  setDoc(doc(getFirestore(), "users/", uid, "categorys", String(category.id)), {
    name: category.name,
  });
  // setDoc(doc(getFirestore(), "users/", uid, "categorys", String(category.id)), {
  //   name: category.name,
  // }).then((v)=>{
  //   return state error
  // }).catch((error)=>{
  //   throw new Error('error')
  // })
}
async function getCategory(uid: string): Promise<any> {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", uid, "categorys")
  );
  let categoryRepository: Array<Category> = [];
  querySnapshot.forEach((doc) => {
    categoryRepository.push({
      _tag: "Category",
      id: doc.id,
      name: doc.data().name,
    });
  });
  return categoryRepository;
}

export const CategoryRepository = {
  updateCategory,
  getCategory,
};
