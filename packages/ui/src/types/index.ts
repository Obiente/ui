/**
 * Obiente UI - Types
 * 
 * This file exports all types and interfaces used in the UI library.
 */

// Export theme types
export * from './theme';

// Common component prop types
export interface CommonProps {
  /**
   * Custom CSS classes to apply to the component
   */
  customClasses?: string;
  
  /**
   * Theme-specific classes from the current theme
   */
  themeClasses?: string;
}

// Common form input props
export interface FormInputProps extends CommonProps {
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Label text for the input
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Error message text
   */
  error?: string;
}
