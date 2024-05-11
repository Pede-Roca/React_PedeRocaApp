import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBEpOhvrnBXQXLc2ZS4urtqwp5vbe491fI",
  authDomain: "pederoca-22e90.firebaseapp.com",
  projectId: "pederoca-22e90",
  storageBucket: "pederoca-22e90.appspot.com",
  messagingSenderId: "564130123521",
  appId: "1:564130123521:web:e67bb641d02773b8ba1500",
  measurementId: "G-03XW73BKNQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);