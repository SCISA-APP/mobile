export type ListingType = 'Internship' | 'Job' | 'NSS';

export type Department =
  | 'Computer Science'
  | 'Food Science'
  | 'Actuarial Science'
  | 'Environmental Science'
  | 'Optometry'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biological Science'
  | 'Statistics'
  | 'Biochemistry';

export interface Listing {
  id: string;
  company: string;
  logo?: string; // URL to company logo image
  location: string;
  role: string;
  department: Department;
  type: ListingType;
  stipend?: {
    amount: number;
    currency: string;
    period: 'monthly' | 'weekly' | 'total';
  };
  duration: string;
  deadline: string;
  description: string;
  skills: string[];
  contact: {
    email?: string;
    phone?: string;
    name?: string;
  };
  tint: string;
}

export const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Food Science',
  'Actuarial Science',
  'Environmental Science',
  'Optometry',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biological Science',
  'Statistics',
  'Biochemistry',
];

export const LISTINGS: Listing[] = [

];

export const LISTINGS_BY_DEPARTMENT: Record<Department, Listing[]> = DEPARTMENTS.reduce(
  (acc, dept) => {
    acc[dept] = LISTINGS.filter((l) => l.department === dept);
    return acc;
  },
  {} as Record<Department, Listing[]>,
);