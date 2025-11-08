export interface Counselor {
  id: string;
  name: string;
  type: 'Peer' | 'Departmental';
  department: string;
  image: string;
  bio: string;
  specialties: string[];
}

export interface Quote {
  q: string;
  a: string;
  gradient: string[];
}

export interface Booking {
  id: string;
  counselorName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  counselorImage: string;
  location: string;
  notes: string;
}
