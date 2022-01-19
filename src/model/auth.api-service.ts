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

//失敗
function userConfirm() {
  onAuthStateChanged(getAuth(), (user) => {
    return user;
  });
}
async function signIn(mail: string, pw: string) {
  return signInWithEmailAndPassword(getAuth(), mail, pw);
}

async function signOutRep() {
  return signOut(getAuth());
}

async function userDelete(){
  onAuthStateChanged(getAuth(),(user)=>{
    if(user){
      return deleteUser(user)
    }else{
      throw new Error('user is no')
    }
  })
}

async function forgetPwRp(mail:string){
  return sendPasswordResetEmail(getAuth(), mail)
}

export const AuthRepository = {
  signUp,
  signIn,
  userConfirm,
  signOutRep,
  userDelete,
  forgetPwRp
};
