import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Category } from "./category.model";

function updateCategoryRep(category: Category, uid: string) {
  return setDoc(
    doc(getFirestore(), "users/", uid, "categorys", String(category.id)),
    {
      name: category.name,
    }
  );
}
async function getCategoryRep(uid: string): Promise<Array<Category>> {
  const querySnapshot = await getDocs(
    collection(getFirestore(), "users", uid, "categorys")
  );
  const categoryRepository: Array<Category> = [];
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
  updateCategoryRep,
  getCategoryRep,
};
