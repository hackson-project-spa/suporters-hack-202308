// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC42y6833QRzZWKBg1miqPb0qs75SU33eI",
  authDomain: "suporters-hack-202308.firebaseapp.com",
  projectId: "suporters-hack-202308",
  storageBucket: "suporters-hack-202308.appspot.com",
  messagingSenderId: "217142083317",
  appId: "1:217142083317:web:f149a58c73f9818e86cfbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
