import { z } from "zod";

export const stepSchemas = {
  1: z.object({
    contactNumber: z.string().nonempty("Contact number is required"),
    hostel: z.string().nonempty("Hostel is required"),
    cwa: z.string().nonempty("CWA is required"),
    hasScholarship: z.string().nonempty("Scholarship info is required"),
  }),
    2: z.object({
    passportPicture: z.string().nonempty("Passport is required"),
    studentId: z.string().nonempty("Student ID is required"),
  }),
  3: z.object({
    sponsor: z.string().nonempty("Sponsor name is required"),
    sponsorOccupation: z.string().nonempty("Sponsor occupation is required"),
    sponsorIncomeRange: z.string().nonempty("Sponsor income range is required"),
    dependents: z.string().nonempty("Dependents info is required"),
  }),
  4: z.object({
    reason: z.string().nonempty("Reason is required"),
  }),
  5: z.object({
    declarationAccepted: z.boolean().refine(val => val, "You must accept the declaration"),
  }),
  6: z.object({}), // No fields to validate for final step
};

export const validateStep = (step: number, data: any) => {
  try {
    const schema = stepSchemas[step];
    const schemaKeys = Object.keys(schema.shape);

    const stepData = schemaKeys.reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {} as any);

    schema.parse(stepData);

    return { success: true, errors: {} };
  } catch (err: any) {
    if (err.errors) {
      const errorObj: Record<string, string> = {};

      err.errors.forEach((e: any) => {
        const field = e.path[0];
        const message = e.message; // ← REAL message
        errorObj[field] = message;
      });

      return { success: false, errors: errorObj };
    }

    return { success: false, errors: {} };
  }
};
