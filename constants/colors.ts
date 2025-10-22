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
  // Primary Colors
  primary: '#2B4C83',
  primaryLight: '#5A7AB0',
  primaryDark: '#002259',
  
  // Secondary Colors
  secondary: '#FF6B35',
  secondaryLight: '#FF9B5C',
  secondaryDark: '#C43B00',
  
  // Background
  background: '#FFFFFF',
  surface: '#F8F9FA',
  
  // Text
  text: {
    primary: '#212529',
    secondary: '#495057',
    disabled: '#ADB5BD',
    inverse: '#FFFFFF',
  },
  
  // Status
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Grayscale
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
};

export default colors;
