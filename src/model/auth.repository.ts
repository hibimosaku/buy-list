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
function signIn() {
  signInWithEmailAndPassword(getAuth(), "n.kubo@gmail.com", "111111")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
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
