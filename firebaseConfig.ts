// /firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZl0O8NxZM8kGOXXkdcIFsXQ4-zWIRR8g",
  authDomain: "scisa-multipurpose-app.firebaseapp.com",
  projectId: "scisa-multipurpose-app",
  storageBucket: "scisa-multipurpose-app.appspot.com",
  messagingSenderId: "644327945463",
  appId: "1:644327945463:web:2170e23c8cc3131eca0ff2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);
