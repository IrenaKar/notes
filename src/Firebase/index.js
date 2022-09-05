// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeKhmTsTae6lK1e2efI_xKsxbmwZbRdOQ",
    authDomain: "todo-authentication-bc581.firebaseapp.com",
    databaseURL: "https://todo-authentication-bc581-default-rtdb.firebaseio.com",
    projectId: "todo-authentication-bc581",
    storageBucket: "todo-authe ntication-bc581.appspot.com",
    messagingSenderId: "311062907970",
    appId: "1:311062907970:web:aa8750a690eed7610b71db",
    measurementId: "G-K1416TR349"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

