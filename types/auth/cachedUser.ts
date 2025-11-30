export interface CachedUser {
  uid: string;
  full_name?: string;
  avatarUri?: string;
  email?: string;
  program?: string;
  year?: string;
  isShopApplicationAccepted?: boolean;
  [key: string]: any;
}