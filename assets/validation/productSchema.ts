import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be text",
    })
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name must be less than 100 characters" }),
  
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be text",
    })
    .min(1, { message: "Description cannot be empty" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a valid number",
    })
    .positive({ message: "Price must be greater than 0" })
    .max(1000000, { message: "Price seems unreasonably high" }),
  
  stock: z
    .number({
      required_error: "Stock quantity is required",
      invalid_type_error: "Stock must be a valid number",
    })
    .int({ message: "Stock must be a whole number" })
    .nonnegative({ message: "Stock cannot be negative" })
    .max(100000, { message: "Stock quantity seems unreasonably high" }),
  
  tags: z
    .array(z.string().min(1, { message: "Tag cannot be empty" }))
    .min(1, { message: "At least one tag is required" })
    .max(10, { message: "Maximum 10 tags allowed" }),
  
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be text",
    })
    .min(1, { message: "Category is required" }),
  
  status: z
    .enum(['active', 'inactive'], {
      errorMap: () => ({ message: "Status must be either 'active' or 'inactive'" })
    }),
  
  discount: z
    .number({
      required_error: "Discount is required",
      invalid_type_error: "Discount must be a valid number",
    })
    .min(0, { message: "Discount cannot be negative" })
    .max(100, { message: "Discount cannot exceed 100%" }),
  
  front_image: z
    .string({
      required_error: "Front image is required",
      invalid_type_error: "Front image must be a valid image URI",
    })
    .nullable()
    .refine((val) => val !== null && val.length > 0, {
      message: "Please select a front image for your product",
    }),
  
  additional_images: z
    .array(z.string())
    .max(3, { message: "Maximum 3 additional images allowed" })
    .default([]),
  
});

// Export the type for TypeScript
export type ProductFormData = z.infer<typeof productSchema>;