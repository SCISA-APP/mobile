import { supabase } from '@/supabaseConfig';
import { Executive } from '@/types/models/executives';

export async function fetchCollegeExecutives(): Promise<Executive[]> {
  const { data, error } = await supabase
    .from('college_executives')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(row => ({
    id:          row.id,
    name:        row.name,
    role:        row.position,
    image:       row.image   ?? undefined,
    phone:       row.phone   ?? undefined,
    email:       row.email   ?? undefined,
    description: row.description ?? undefined,
  }));
}

export async function fetchDepartmentExecutives(department?: string): Promise<Executive[]> {
  if (!department) return [];

  const { data, error } = await supabase
    .from('department_executives')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(row => ({
    id:          row.id,
    name:        row.name,
    role:        row.position,
    department:  row.department,
    image:       row.image   ?? undefined,
    phone:       row.phone   ?? undefined,
    email:       row.email   ?? undefined,
    description: row.description ?? undefined,
  }));
}