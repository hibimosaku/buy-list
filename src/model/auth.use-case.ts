//use-case

import { AuthRepository } from "./auth.repository";

async function signUpUc(mail: string, pw: string) {
  await AuthRepository.signUp(mail, pw)
    .then((val) => {
      return;
    })
    .catch((error) => {
      throw new Error();
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

async function signOUtUc(mail: string, pw: string) {
  await AuthRepository.signOutR()
    .then((val) => {
      return;
    })
    .catch((error) => {
      throw new Error();
    });
}

export const AuthUseCase = {
  loginUc,
  signUpUc,
  signOUtUc,
};
