export type Rating = {
  id: string;        // Unique identifier for the rating
  name: string;      // Person who gave the rating (or title)
  rateDate: string;  // Date of rating creation (ISO string or readable)
  rateText: string;  // The text review content
  value: number;     // Star value (1–5)
};