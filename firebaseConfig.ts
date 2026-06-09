
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Use initializeAuth with AsyncStorage persistence so the auth session
// survives app restarts (getAuth() uses in-memory only on React Native).
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
