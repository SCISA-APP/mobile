export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  program: string;
  year: number;
  isShopApplicationAccepted?: null;
  expoPushToken?: string | null; 
}