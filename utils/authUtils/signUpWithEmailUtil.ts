// /firebase/authMethods.ts
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const signUpWithEmail = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
    }

    return userCredential.user;
  } catch (error: any) {
    console.error("Signup error:", error);
    throw new Error(error.message);
  }
};
