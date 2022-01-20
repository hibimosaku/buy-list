//use-case

import { AuthRepository } from "./auth.api-service";

async function signUpUc(mail: string, pw: string) {
  return AuthRepository.signUp(mail, pw)
    .then(() => {
      console.log("成功");
      return;
    })
    .catch((error) => {
      throw new Error(`${error},sign up is failure`);
    });
}

async function loginUc(mail: string, pw: string) {
  await AuthRepository.signIn(mail, pw)
    .then((val) => {
      return;
    })
    .catch((error) => {
      throw new Error();
    });
}

async function signOUtUc() {
  await AuthRepository.signOutRep()
    .then(() => {
      return;
    })
    .catch((error) => {
      throw new Error("signOut is failure");
    });
}

async function userDeleteUc() {
  await AuthRepository.userDelete()
    .then(() => {
      return;
    })
    .catch((e) => {
      throw new Error("userDelete is failure");
    });
}

async function forgetPwUc(mail: string) {
  await AuthRepository.forgetPwRp(mail)
    .then(() => {
      return;
    })
    .catch(() => {
      throw new Error("error");
    });
}

export const AuthUseCase = {
  loginUc,
  signUpUc,
  signOUtUc,
  userDeleteUc,
  forgetPwUc,
};
