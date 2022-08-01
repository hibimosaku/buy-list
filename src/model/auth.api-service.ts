import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  // getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

async function signUp(mail: string, pw: string) {
  return (
    createUserWithEmailAndPassword(getAuth(), mail, pw)
      //ログイン時、DBにドキュメント作成
      //【課題→解決】for文で、何回もDB送信している。
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
      })
  );
}

async function signIn(mail: string, pw: string) {
  return signInWithEmailAndPassword(getAuth(), mail, pw);
}

async function signOutRep() {
  return signOut(getAuth());
}

function initFirebaseAuth() {
  return new Promise((resolve)=>{
//onclick　解除する設定がない。1回きり
    const unsubscribe= onAuthStateChanged(getAuth(), (user) => {
      resolve(user)//onclick登録解除する。ストリーム処理
      unsubscribe() //登録解除用の関数
      return user
    })
  })
}
//動いているか要確認
async function userDelete() {
  const user:any =await initFirebaseAuth()
  deleteDoc(doc(getFirestore(),"users",user.uid))
  if(user){
    deleteUser(user)
    return user.uid
  }else{
    throw new Error()
  }
}

async function forgetPwRp(mail: string) {
  return sendPasswordResetEmail(getAuth(), mail);
}

export const AuthApi = {
  signUp,
  signIn,
  initFirebaseAuth,
  signOutRep,
  userDelete,
  forgetPwRp,
};
