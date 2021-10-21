//repository

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// const auth = getAuth();

function signUp() {
  createUserWithEmailAndPassword(getAuth(), "n.kubo@gmail.com", "111111")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
}
function signIn(mail:string,pw:string) {
  signInWithEmailAndPassword(getAuth(), mail, pw)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('成功',user.uid);
      alert('成功')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export const AuthRepository = {
  signUp,
  signIn,
};
