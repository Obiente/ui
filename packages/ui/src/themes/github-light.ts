import { BaseThemeProps } from '../types/theme';

/**
 * GitHub Light Theme for Obiente UI
 * A light theme inspired by GitHub's light mode
 */
const githubLight: BaseThemeProps = {
  id: 'github-light',
  name: 'GitHub Light',
  flavor: 'light',
  variables: {
    // Base colors inspired by GitHub's light theme
    '--color-gray-50': '#f9fafb',
    '--color-gray-100': '#f3f4f6',
    '--color-gray-200': '#e5e7eb',
    '--color-gray-300': '#d1d5db',
    '--color-gray-400': '#9ca3af',
    '--color-gray-500': '#6b7280',
    '--color-gray-600': '#4b5563',
    '--color-gray-700': '#374151',
    '--color-gray-800': '#1f2937',
    '--color-gray-900': '#111827',
    
    // GitHub brand colors
    '--color-blue-50': '#f0f6ff',
    '--color-blue-100': '#e0eeff',
    '--color-blue-200': '#bae6fd',
    '--color-blue-300': '#7dd3fc',
    '--color-blue-400': '#38bdf8',
    '--color-blue-500': '#0ea5e9',
    '--color-blue-600': '#0284c7',
    '--color-blue-700': '#0369a1',
    '--color-blue-800': '#075985',
    '--color-blue-900': '#0c4a6e',
    
    // Semantic colors
    '--color-red-400': '#f87171',
    '--color-red-500': '#ef4444',
    '--color-red-600': '#dc2626',
    '--color-green-400': '#4ade80',
    '--color-green-500': '#22c55e',
    '--color-green-600': '#16a34a',
    '--color-yellow-400': '#fbbf24',
    '--color-yellow-500': '#f59e0b',
    '--color-yellow-600': '#d97706',
    '--color-purple-400': '#a78bfa',
    '--color-purple-500': '#8b5cf6',
    '--color-purple-600': '#7c3aed',
    
    // Semantic color mapping for light theme
    '--color-background': '#ffffff',
    '--color-background-muted': '#f6f8fa',
    '--color-background-subtle': '#f3f4f6',
    '--color-foreground': '#24292f',
    '--color-foreground-muted': '#57606a',
    '--color-foreground-subtle': '#6e7781',
    '--color-border': '#d0d7de',
    '--color-border-muted': '#e5e7eb',
    '--color-border-subtle': '#f3f4f6',
    
    // Primary colors (GitHub blue)
    '--color-primary': '#0969da',
    '--color-primary-light': '#218bff',
    '--color-primary-dark': '#0550ae',
    
    // Secondary colors 
    '--color-secondary': '#6e7781',
    '--color-secondary-light': '#9ca3af',
    '--color-secondary-dark': '#57606a',
    
    // Semantic state colors
    '--color-success': '#1a7f37',
    '--color-error': '#cf222e',
    '--color-warning': '#9a6700',
    '--color-info': '#0969da',

    // Shadows
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Border radius
    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',
    '--radius-xl': '0.75rem',
    '--radius-2xl': '1rem'
  }
};

export default githubLight;
