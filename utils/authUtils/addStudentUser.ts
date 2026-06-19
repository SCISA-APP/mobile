// /utils/authUtils/addStudentUser.ts
import { supabase } from "@/supabaseConfig";

interface StudentUserData {
  uid: string;
  fullName: string;
  email: string;
  program: string;
  year: number | string;
  permission: string;
}

export const addStudentUser = async (data: StudentUserData) => {
  const { error } = await supabase.from('profiles').insert({
    id: data.uid,
    full_name: data.fullName,
    email: data.email,
    program: data.program,
    year: Number(data.year),
  });

  if (error) {
    console.error('Error adding student user:', error);
    throw error;
  }

  console.log('Student user added to Supabase:', data);
};