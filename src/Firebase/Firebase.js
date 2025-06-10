import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACWx1HaKwgTfubgxsQaTDjeuDINcwduPc",
  authDomain: "enterrestaurant-167d6.firebaseapp.com",
  projectId: "enterrestaurant-167d6",
  storageBucket: "enterrestaurant-167d6.firebasestorage.app",
  messagingSenderId: "814042300875",
  appId: "1:814042300875:web:fac1c9501c55f94e78364e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
