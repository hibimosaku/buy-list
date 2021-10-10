import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Category } from "./category.model";

let categoryRepository: any = [];

function newSaveCategory(category: Category, userId: string) {
  setDoc(doc(getFirestore(), "users/", userId, "categorys", category.id), {
    name: category.name,
  });
}
async function getCategory(userId: string): any {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "categorys")
  );
  querySnapshot.forEach((doc) => {
    categoryRepository[doc.id] = doc.data();
    // categoryRepository.push({
    //   _tag:'Category',
    //   id:doc.id,
    //   name:doc.data().name
    // })
  });
  console.log("categoryリポジトリから", categoryRepository);
  return categoryRepository;
}

// function deleteItem(){

// }

export const CategoryRepository = {
  newSaveCategory,
  // findCategory,
  getCategory,
  categoryRepository,
};
