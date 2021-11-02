import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  // getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

async function signUp(mail: string, pw: string) {
  createUserWithEmailAndPassword(getAuth(), mail, pw)
    //ログイン時、DBにドキュメント作成
    //【課題→解決】for文で、何回もDB送信している。
    .then((userCredential) => {
      setDoc(
        doc(getFirestore(), "users/", userCredential.user.uid, "categorys/"),
        [...new Array(10)].map((_) => ({ name: "" }))
      );
    });
}

//失敗
function userConfirm() {
  onAuthStateChanged(getAuth(), (user) => {
    return user;
  });
}
async function signIn(mail: string, pw: string) {
  return await signInWithEmailAndPassword(getAuth(), mail, pw);
}

async function signOutR() {
  await signOut(getAuth());
}

export const AuthRepository = {
  signUp,
  signIn,
  userConfirm,
  signOutR,
};
