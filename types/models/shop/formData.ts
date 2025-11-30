export interface ShopFormData {
  storeName: string;
  shopDescription: string;
  studentIdUri: string;
  nationalIdUri: string;
  paymentType: string;
  bankName?: string;
  mobileProvider?: string;
  accountNumber: string;
  accountName: string;
  productCount?: number;
}
