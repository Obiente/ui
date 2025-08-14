/**
 * Component CSS Generation
 * Utilities for generating component-specific CSS from themes
 */

import type { ThemeDefinition, ComponentThemeClasses } from '../types';
import { THEME_CLASS_PREFIX } from '../core/constants';

/**
 * Generate component theme classes with proper prefixing
 */
export function generateComponentClasses(
  theme: ThemeDefinition,
  prefix: string = theme.id
): ComponentThemeClasses {
  const classes: ComponentThemeClasses = {
    button: {},
    input: {},
    card: {},
    badge: {},
    alert: {},
  };
  
  Object.entries(theme.components).forEach(([component, variants]) => {
    classes[component] = classes[component] || {};
    Object.entries(variants).forEach(([variant, className]) => {
      classes[component][variant] = `${prefix}-${className}`;
    });
  });
  
  return classes;
}

/**
 * Generate complete component CSS for a theme
 */
export function generateComponentCSS(theme: ThemeDefinition): string {
  const styles: string[] = [];
  
  // Generate button styles
  Object.entries(theme.components.button || {}).forEach(([variant, className]) => {
    styles.push(generateButtonCSS(className, variant, theme));
  });
  
  // Generate card styles
  Object.entries(theme.components.card || {}).forEach(([variant, className]) => {
    styles.push(generateCardCSS(className, variant, theme));
  });
  
  // Generate input styles
  Object.entries(theme.components.input || {}).forEach(([variant, className]) => {
    styles.push(generateInputCSS(className, variant, theme));
  });
  
  return styles.join('\n\n');
}

/**
 * Generate CSS for button variants
 */
function generateButtonCSS(className: string, variant: string, theme: ThemeDefinition): string {
  const baseStyles = `
.${className} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
}`;
  
  const variantStyles = {
    primary: `
.${className} {
  background-color: ${theme.semantic.accent.primary};
  color: ${theme.semantic.text.inverse};
}

.${className}:hover {
  opacity: 0.9;
}

.${className}:focus {
  outline: 2px solid ${theme.semantic.accent.primary};
  outline-offset: 2px;
}`,
    
    secondary: `
.${className} {
  background-color: ${theme.semantic.surface.raised};
  color: ${theme.semantic.text.primary};
  border-color: ${theme.semantic.border.default};
}

.${className}:hover {
  background-color: ${theme.semantic.surface.overlay};
}`,
    
    outline: `
.${className} {
  background-color: transparent;
  color: ${theme.semantic.accent.primary};
  border-color: ${theme.semantic.accent.primary};
}

.${className}:hover {
  background-color: ${theme.semantic.accent.primary};
  color: ${theme.semantic.text.inverse};
}`,
    
    ghost: `
.${className} {
  background-color: transparent;
  color: ${theme.semantic.text.primary};
}

.${className}:hover {
  background-color: ${theme.semantic.surface.raised};
}`
  };
  
  return baseStyles + '\n' + (variantStyles[variant as keyof typeof variantStyles] || '');
}

/**
 * Generate CSS for card variants
 */
function generateCardCSS(className: string, variant: string, theme: ThemeDefinition): string {
  const baseStyles = `
.${className} {
  border-radius: 0.5rem;
  overflow: hidden;
}`;
  
  const variantStyles = {
    default: `
.${className} {
  background-color: ${theme.semantic.surface.base};
  border: 1px solid ${theme.semantic.border.default};
}`,
    
    elevated: `
.${className} {
  background-color: ${theme.semantic.surface.raised};
  border: 1px solid ${theme.semantic.border.subtle};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`,
    
    interactive: `
.${className} {
  background-color: ${theme.semantic.surface.base};
  border: 1px solid ${theme.semantic.border.default};
  cursor: pointer;
  transition: all 0.2s ease;
}

.${className}:hover {
  background-color: ${theme.semantic.surface.raised};
  border-color: ${theme.semantic.border.accent};
}`
  };
  
  return baseStyles + '\n' + (variantStyles[variant as keyof typeof variantStyles] || '');
}

/**
 * Generate CSS for input variants
 */
function generateInputCSS(className: string, variant: string, theme: ThemeDefinition): string {
  const baseStyles = `
.${className} {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.2s ease;
}`;
  
  const variantStyles = {
    default: `
.${className} {
  background-color: ${theme.semantic.surface.base};
  border: 1px solid ${theme.semantic.border.default};
  color: ${theme.semantic.text.primary};
}

.${className}:focus {
  outline: none;
  border-color: ${theme.semantic.border.focus};
  box-shadow: 0 0 0 3px ${theme.semantic.accent.primary}20;
}

.${className}::placeholder {
  color: ${theme.semantic.text.muted};
}`,
    
    error: `
.${className} {
  background-color: ${theme.semantic.surface.base};
  border: 1px solid ${theme.semantic.accent.danger};
  color: ${theme.semantic.text.primary};
}

.${className}:focus {
  outline: none;
  border-color: ${theme.semantic.accent.danger};
  box-shadow: 0 0 0 3px ${theme.semantic.accent.danger}20;
}`
  };
  
  return baseStyles + '\n' + (variantStyles[variant as keyof typeof variantStyles] || '');
}
