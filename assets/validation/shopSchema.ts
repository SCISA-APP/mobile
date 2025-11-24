// validation/shopSchema.ts
import { z } from 'zod';

export const shopSchema = z.object({
  storeName: z
    .string()
    .min(1, 'Store Name is required')
    .max(15, 'Store Name cannot exceed 15 characters'),
  shopDescription: z
    .string()
    .min(1, 'Shop Description is required')
    .max(150, 'Shop Description cannot exceed 150 characters'),
  studentId: z.string().min(1, 'Student ID is required'),
  nationalId: z.string().min(1, 'National ID is required'),
  paymentType: z.enum(['Bank', 'Mobile Money']),
  bankName: z.string().optional(),
  mobileProvider: z.string().optional(),
  accountNumber: z.string().min(1, 'Account Number is required'),
  accountName: z.string().min(1, 'Account Name is required'),
});
