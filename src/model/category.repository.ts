import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Category } from "./category.model";

// let categoryRepository: Array<Category> = [];

function newSaveCategory(category: Category, userId: string) {
  setDoc(
    doc(getFirestore(), "users/", userId, "categorys", String(category.id)),
    {
      name: category.name,
    }
  );
}
async function getCategory(userId: string): Promise<any> {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", userId, "categorys")
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
  newSaveCategory,
  // findCategory,
  getCategory,
  // categoryRepository,
};
