export interface Executive {
  id: number;
  name: string;
  role: string;           // maps from `position` in DB
  department?: string;    // only for department executives
  image?: string;
  phone?: string;
  email?: string;
  description?: string;
}