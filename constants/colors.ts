export interface AppColors {
  // Primary Colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary Colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // Background
  background: string;
  surface: string;
  
  // Text
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  
  // Status
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Common
  white: string;
  black: string;
  transparent: string;
  
  // Grayscale
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

const colors: AppColors = {
  // Primary Colors - College of Science: Blue, Red, White
  primary: '#1E40AF', // Deep Blue
  primaryLight: '#3B82F6', // Bright Blue
  primaryDark: '#1E3A8A', // Navy Blue
  
  // Secondary Colors - Red accent
  secondary: '#DC2626', // Vibrant Red
  secondaryLight: '#EF4444', // Light Red
  secondaryDark: '#991B1B', // Dark Red
  
  // Background
  background: '#FFFFFF',
  surface: '#F8FAFC',
  
  // Text
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    disabled: '#CBD5E1',
    inverse: '#FFFFFF',
  },
  
  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#3B82F6',
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Grayscale
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export default colors;
