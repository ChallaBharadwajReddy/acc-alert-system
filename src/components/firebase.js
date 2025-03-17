// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClcxdM87GuzeDGZPbHH8JCUutM_ThoGz4",
  authDomain: "accident-alert-7b547.firebaseapp.com",
  projectId: "accident-alert-7b547",
  storageBucket: "accident-alert-7b547.firebasestorage.app",
  messagingSenderId: "85211240209",
  appId: "1:85211240209:web:44e35f6e1821d2e0a89eb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;