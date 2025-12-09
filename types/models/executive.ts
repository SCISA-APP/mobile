export interface Executive {
  id: string;
  name: string;
  position: string;
  category: 'college' | 'department';
  department?: string;
  email: string;
  phone: string;
  image: string;
  bio?: string;
  verified?: boolean;
}

export type ExecutiveCategory = 'college' | 'department';
