import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwAJ7WuqpMHe7-dQeRzgcA-XIuaurFJkE",
  authDomain: "farmgest-176d3.firebaseapp.com",
  projectId: "farmgest-176d3",
  storageBucket: "farmgest-176d3.appspot.com",
  messagingSenderId: "441761572298",
  appId: "1:441761572298:web:a4b49d864c121bd5819b33",
  measurementId: "G-YSN9X2MMX1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app };