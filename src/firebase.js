import { initializeApp } from "@firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyBsV0Q0wuGcuq-rZQ6Dy5RH8legmwnLcmg",
    authDomain: "crud-asi.firebaseapp.com",
    databaseURL: "https://crud-asi-default-rtdb.firebaseio.com",
    projectId: "crud-asi",
    storageBucket: "crud-asi.appspot.com",
    messagingSenderId: "189901715454",
    appId: "1:189901715454:web:0e024f9885026af919f2af",
    measurementId: "G-K7YSEK8THN"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;