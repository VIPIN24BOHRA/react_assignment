import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh_sXOObpFErtne7E6if0dwjhkKph5RdQ",
  authDomain: "react-assignment-7753f.firebaseapp.com",
  projectId: "react-assignment-7753f",
  storageBucket: "react-assignment-7753f.appspot.com",
  messagingSenderId: "231156364406",
  appId: "1:231156364406:web:36b1bccea82fdf3a93db57",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
export const colRef = collection(db, "people");

export const authentication = getAuth(firebase);
