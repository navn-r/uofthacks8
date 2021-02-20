import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';


const TEMP = {
  apiKey: "AIzaSyBNQ_pyoZMquEJo-zQOx91O0XN7gR80oQc",
  authDomain: "munchify-temp.firebaseapp.com",
  projectId: "munchify-temp",
  storageBucket: "munchify-temp.appspot.com",
  messagingSenderId: "169854324606",
  appId: "1:169854324606:web:e9fa5afd0e77efaca7ed2f"
};


const OLD = {
  apiKey: "AIzaSyBEwNpTo1y27ZGuahae0YIaC3t-uY9fRj0",
  authDomain: "uofthacks2021.firebaseapp.com",
  projectId: "uofthacks2021",
  storageBucket: "uofthacks2021.appspot.com",
  messagingSenderId: "205136705715",
  appId: "1:205136705715:web:f951a5ec99cb950c2a98c6"
}

const app = firebase.initializeApp(TEMP);

export const auth = app.auth();
export const db = app.firestore();
export default app;