import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR7uTioum8Nche0NaXpcviON-DGOT4n9k",
  authDomain: "anxiety-78b52.firebaseapp.com",
  projectId: "anxiety-78b52",
  storageBucket: "anxiety-78b52.firebasestorage.app",
  messagingSenderId: "371093036972",
  appId: "1:371093036972:web:b432ed6ea68c6426d0a409",
  measurementId: "G-YVLGMGVGHK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

