import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const CONFIG = {
  apiKey: "AIzaSyBEwNpTo1y27ZGuahae0YIaC3t-uY9fRj0",
  authDomain: "uofthacks2021.firebaseapp.com",
  projectId: "uofthacks2021",
  storageBucket: "uofthacks2021.appspot.com",
  messagingSenderId: "205136705715",
  appId: "1:205136705715:web:f951a5ec99cb950c2a98c6"
}

const app = firebase.initializeApp(CONFIG);

export const auth = app.auth();
export const db = app.firestore();
export default app;