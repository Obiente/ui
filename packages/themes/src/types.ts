export interface ColorPalette {
  // Semantic Base Colors
  background: string;
  foreground: string;
  
  // Surface Colors (backgrounds for components)
  surface: {
    base: string;
    raised: string;
    overlay: string;
    muted: string;
  };
  
  // Text Colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
  };
  
  // Border Colors
  border: {
    default: string;
    muted: string;
    strong: string;
  };
  
  // Accent Colors (semantic meanings)
  accent: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  
  // Interactive States
  interactive: {
    hover: string;
    active: string;
    disabled: string;
    focus: string;
  };
  
  // Extended colors (optional for design system specific colors)
  extended?: Record<string, string>;
}

// Since ColorPalette is now semantic, we don't need complex semantic tokens
// We can remove this interface or keep it minimal for backwards compatibility
export interface SemanticTokens {
  // Optional overrides for specific use cases
  // Most themes won't need this as ColorPalette is already semantic
}

export interface ThemeDefinition {
  id: string;
  name: string;
  variant: 'light' | 'dark';
  colors: ColorPalette;
  // Optional metadata
  family?: string; // e.g., 'catppuccin', 'material', 'nord'
  description?: string;
}
