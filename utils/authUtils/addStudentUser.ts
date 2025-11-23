// /utils/firestoreUtils/addStudentUser.ts
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface StudentUserData {
  uid: string;
  fullName: string;
  email: string;
  program: string;
  year: number | string;
  permission: string;
}

export const addStudentUser = async (data: StudentUserData) => {
  try {
    const userRef = doc(db, "Student_Users", data.uid);
    await setDoc(userRef, data);
    console.log("Student user added to Firestore:", data);
  } catch (error) {
    console.error("Error adding student user:", error);
    throw error;
  }
};
