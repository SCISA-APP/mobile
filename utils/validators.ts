// utils/validators.ts

/**
 * Checks if the provided string is a valid email.
 * Returns true if valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};
