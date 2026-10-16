import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZzkhjMTyGhexFPvrwN9pnBdcAWM61AIo",
  authDomain: "infinity-website-6b29b.firebaseapp.com",
  projectId: "infinity-website-6b29b",
  storageBucket: "infinity-website-6b29b.firebasestorage.app",
  messagingSenderId: "884126948907",
  appId: "1:884126948907:web:90817284875f01543c146e",
  measurementId: "G-GMYV14165P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
