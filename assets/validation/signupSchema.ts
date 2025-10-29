import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .regex(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Full name must contain at least two separate names'
    ),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  program: z.string().min(1, 'Please select a program'),
  year: z.union([
    z.string().min(1, 'Please select a year'),
    z.number().int().positive(),
  ]),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
