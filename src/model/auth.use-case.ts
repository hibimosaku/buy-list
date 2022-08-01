//use-case

import { AuthApi } from "./auth.api-service";
import { BuyInfoRepository } from "./buy-info.repository";



async function signUpUc(mail: string, pw: string) {
  return AuthApi.signUp(mail, pw)
    .then(() => {
      console.log("成功");
      return;
    })
    .catch((error) => {
      throw new Error(`${error},sign up is failure`);
    });
}

async function loginUc(mail: string, pw: string) {
  await AuthApi.signIn(mail, pw)
    .then(async(val) => {
      const user = await AuthApi.initFirebaseAuth()
      // store.dispatch('registerAuth',user)
      return user;
    })
    .catch((error) => {
      throw new Error();
    });
}

async function signOUtUc() {
  await AuthApi.signOutRep()
    .then(() => {
      return;
    })
    .catch((error) => {
      throw new Error("signOut is failure");
    });
}

async function userDeleteUc() {
  try{
    let uid = await AuthApi.userDelete()
    console.log(uid)
    await BuyInfoRepository.deleteAllRep(uid)
    console.log('success')
    return
  }catch(error){
    throw new Error("userDelete is failure");
  }
  // await AuthApi.userDelete()
  //   .then(() => {
  //     return;
  //   })
  //   .catch((e) => {
  //     throw new Error("userDelete is failure");
  //   });
}

async function forgetPwUc(mail: string) {
  await AuthApi.forgetPwRp(mail)
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
