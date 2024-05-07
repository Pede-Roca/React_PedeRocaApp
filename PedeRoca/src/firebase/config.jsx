import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBEpOhvrnBXQXLc2ZS4urtqwp5vbe491fI",
  authDomain: "pederoca-22e90.firebaseapp.com",
  projectId: "pederoca-22e90",
  storageBucket: "pederoca-22e90.appspot.com",
  messagingSenderId: "564130123521",
  appId: "1:564130123521:web:e67bb641d02773b8ba1500",
  measurementId: "G-03XW73BKNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);