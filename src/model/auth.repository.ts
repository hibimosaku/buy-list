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
    //【課題】for文で、何回もDB送信している。
    .then((userCredential) => {
      for (let i = 0; i < 9; i++) {
        setDoc(
          doc(
            getFirestore(),
            "users/",
            userCredential.user.uid,
            "categorys/",
            String(i)
          ),
          {
            name: "",
          }
        );
      }
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
  await signOut;
}

export const AuthRepository = {
  signUp,
  signIn,
  userConfirm,
  signOutR,
};
