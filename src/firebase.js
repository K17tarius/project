// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDuNU7nYk3IMHqReV6n1l-PR5a8OFCyUM",
  authDomain: "biz-ezy.firebaseapp.com",
  databaseURL: "https://biz-ezy-default-rtdb.firebaseio.com",
  projectId: "biz-ezy",
  storageBucket: "biz-ezy.appspot.com",
  messagingSenderId: "737989012137",
  appId: "1:737989012137:web:1e72212348ba44d1ab97b8",
  measurementId: "G-366Z1HR8J5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
