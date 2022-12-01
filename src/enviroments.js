// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX1AYANAMaXVUxpjCaYLcTS4lHC_x1LMs",
  authDomain: "smartpark-286d6.firebaseapp.com",
  databaseURL: "https://smartpark-286d6-default-rtdb.firebaseio.com",
  projectId: "smartpark-286d6",
  storageBucket: "smartpark-286d6.appspot.com",
  messagingSenderId: "261115306083",
  appId: "1:261115306083:web:a5b6a313f74e0908171856",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
