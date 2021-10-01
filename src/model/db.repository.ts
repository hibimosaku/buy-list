import {
  collection,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

// const db=getFirestore()

async function dbread() {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
  });
}

function dbwrite() {
  setDoc(doc(getFirestore(), "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
}

export const DbRepository = {
  dbread,
  dbwrite,
};
