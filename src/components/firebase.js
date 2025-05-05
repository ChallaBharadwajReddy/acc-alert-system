// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHuA6b-2g5-OIR28qKA1vH7v4dt9ee38M",
  authDomain: "smart-accident-detection-6db4d.firebaseapp.com",
  databaseURL: "https://smart-accident-detection-6db4d-default-rtdb.firebaseio.com",
  projectId: "smart-accident-detection-6db4d",
  storageBucket: "smart-accident-detection-6db4d.firebasestorage.app",
  messagingSenderId: "141198395270",
  appId: "1:141198395270:web:d56db613d61b35d85e0e07",
  measurementId: "G-FXKCHNNG8L"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export const rdb=getDatabase()
export default app;