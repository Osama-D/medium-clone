import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbO3dQLHmqG5J820ij3ShmQL26jvtEtlg",
  authDomain: "medium-c5a2c.firebaseapp.com",
  projectId: "medium-c5a2c",
  storageBucket: "medium-c5a2c.appspot.com",
  messagingSenderId: "839815342511",
  appId: "1:839815342511:web:30ed6fae5503288c63e75a",
  measurementId: "G-1XSLJ1GJT0",
};
var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbO3dQLHmqG5J820ij3ShmQL26jvtEtlg",
  authDomain: "medium-c5a2c.firebaseapp.com",
  projectId: "medium-c5a2c",
  storageBucket: "medium-c5a2c.appspot.com",
  messagingSenderId: "839815342511",
  appId: "1:839815342511:web:30ed6fae5503288c63e75a",
  measurementId: "G-1XSLJ1GJT0",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = firebaseApp.firestore();
export { db };
export const auth = getAuth(app);
