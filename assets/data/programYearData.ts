

// Define explicit types
export type Program =
  | 'Computer Science'
  | 'Physics'
  | 'Actuarial Science'
  | 'Chemistry'
  | 'Environmental Science'
  | 'Biological Science'
  | 'Biochemistry'
  | 'Mathematics'
  | 'Optometry'
  | 'Meteorological and Climate Sciences'
  | 'Food Science and Technology'
  | 'Statistics';

export type YearLevel = 100 | 200 | 300 | 400 | 500 | 600;

// Typed arrays
export const programs: Program[] = [
  'Computer Science',
  'Physics',
  'Actuarial Science',
  'Chemistry',
  'Environmental Science',
  'Biological Science',
  'Biochemistry',
  'Mathematics',
  'Optometry',
  'Meteorological and Climate Sciences',
  'Food Science and Technology',
  'Statistics',
];

export const years: YearLevel[] = [100, 200, 300, 400, 500, 600];
