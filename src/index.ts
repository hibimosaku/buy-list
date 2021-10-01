import { createApp } from "vue";
import router from "./router/";
// import {store,key} from "./store";
// import { store, key } from './stores/store';
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ZoDiyxNZBWFgntlnBEcrFkfAgOo2RIE",
  authDomain: "buy-list-cf.firebaseapp.com",
  projectId: "buy-list-cf",
  storageBucket: "buy-list-cf.appspot.com",
  messagingSenderId: "1087310780588",
  appId: "1:1087310780588:web:1c8d10b9943ea3d7296709",
  measurementId: "G-0K9W3P389E",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(appF);
// const app = createApp({})
// createApp(App).use(router).mount("#app");

// app.use(router)
// app.use(store, key)

// app.mount('#app')
document.addEventListener("DOMContentLoaded", () => {
  //   createApp(App).use(router).use(store, key).mount('#app');
  // createApp().use(router).mount("#app");
  const app = createApp({});

  app.use(router);
  app.mount("#app");
});
