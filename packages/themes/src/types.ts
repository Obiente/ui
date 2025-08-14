/**
 * Obiente UI Theme System Types
 * Generic, reusable types for any theme system
 */

/**
 * Raw color palette - flexible structure for any color system
 */
export interface ColorPalette {
  [colorName: string]: string;
}

/**
 * Semantic color mapping - maps UI purposes to palette colors
 */
export interface SemanticTokens {
  surface: {
    base: string;
    raised: string;
    overlay: string;
    subtle: string;
    muted: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    inverse: string;
  };
  border: {
    default: string;
    subtle: string;
    accent: string;
    focus: string;
  };
  accent: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

/**
 * Component theme classes - generated class names for components
 */
export interface ComponentThemeClasses {
  button: {
    primary: string;
    secondary: string;
    outline: string;
    ghost: string;
    destructive: string;
    [variant: string]: string;
  };
  input: {
    default: string;
    error: string;
    [variant: string]: string;
  };
  card: {
    default: string;
    elevated: string;
    interactive: string;
    [variant: string]: string;
  };
  badge: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    outline: string;
    [variant: string]: string;
  };
  alert: {
    info: string;
    success: string;
    warning: string;
    error: string;
    [variant: string]: string;
  };
  [component: string]: {
    [variant: string]: string;
  };
}

/**
 * Complete theme definition - generic structure
 */
export interface ThemeDefinition {
  id: string;
  name: string;
  variant: 'light' | 'dark' | 'auto';
  colors: ColorPalette;
  semantic: SemanticTokens;
  components: ComponentThemeClasses;
  metadata?: {
    author?: string;
    description?: string;
    version?: string;
    [key: string]: any;
  };
}

/**
 * CSS variables map - what gets injected at runtime
 */
export interface CSSVariables {
  [variableName: string]: string;
}

/**
 * Theme registry for runtime management
 */
export interface ThemeRegistry {
  [themeId: string]: ThemeDefinition;
}

/**
 * Theme context for providers and hooks
 */
export interface ThemeContext {
  currentTheme: ThemeDefinition;
  availableThemes: string[];
  setTheme: (themeId: string) => void;
  cssVariables: CSSVariables;
  themeClasses: ComponentThemeClasses;
}

/**
 * Theme builder utilities - for creating themes
 */
export interface ThemeBuilder {
  createTheme: (config: Partial<ThemeDefinition> & Pick<ThemeDefinition, 'id' | 'name' | 'colors'>) => ThemeDefinition;
  generateCSSVariables: (theme: ThemeDefinition) => CSSVariables;
  generateComponentClasses: (theme: ThemeDefinition) => ComponentThemeClasses;
}

/**
 * Theme configuration for build system
 */
export interface ThemeBuildConfig {
  themes: ThemeDefinition[];
  outputDir: string;
  generateTypes?: boolean;
  cssVariablePrefix?: string;
  classPrefix?: string;
}
