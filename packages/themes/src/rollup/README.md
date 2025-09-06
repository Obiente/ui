# Obiente Theme Rollup Plugin

A comprehensive Rollup plugin for the Obiente theme system that provides both build-time theme injection and runtime theme management with SSR support.

## Features

- **Build-time theme injection**: Automatically generates CSS files and injects theme links
- **SSR Support**: Server-side theme detection via cookies
- **Client-side theme management**: Runtime theme switching with localStorage/cookie persistence
- **Framework agnostic**: Works with any framework that uses Rollup
- **TypeScript support**: Fully typed APIs

## Installation

```bash
pnpm add @obiente/themes
```

## Usage

### Basic Setup

```javascript
// rollup.config.js
import { obienteTheme } from '@obiente/themes/rollup';

export default {
  plugins: [
    obienteTheme({
      themes: ['catppuccin-latte', 'catppuccin-mocha'],
      defaultTheme: 'catppuccin-latte',
      cookieName: 'obiente-theme',
      attributeName: 'data-theme'
    })
  ]
};
```

### HTML Template Integration

```html
<!DOCTYPE html>
<html>
<head>
  <!-- obiente-theme-inject -->
</head>
<body>
  <h1>Your App</h1>
  <script src="/obiente-theme-manager.js"></script>
</body>
</html>
```

### Client-side Theme Management

```javascript
// Theme switching
window.obienteTheme.setTheme('catppuccin-mocha');

// Get current theme
const currentTheme = window.obienteTheme.getCurrentTheme();

// Listen for theme changes
window.obienteTheme.onThemeChange((event) => {
  console.log('Theme changed to:', event.detail.theme);
});

// Toggle between themes
window.obienteTheme.toggleTheme();
```

### SSR Integration

#### Express.js

```javascript
import { getThemeFromRequest, createExpressThemeMiddleware } from '@obiente/themes/rollup';

const themeMiddleware = createExpressThemeMiddleware({
  cookieName: 'obiente-theme',
  defaultTheme: 'catppuccin-latte',
  attributeName: 'data-theme',
  themes: ['catppuccin-latte', 'catppuccin-mocha']
});

app.use(themeMiddleware);

app.get('/', (req, res) => {
  const theme = req.theme; // Available via middleware
  res.render('index', { theme });
});
```

#### Astro

```astro
---
import { getThemeFromRequest } from '@obiente/themes/rollup';

const theme = getThemeFromRequest(Astro.request, {
  cookieName: 'obiente-theme',
  defaultTheme: 'catppuccin-latte',
  attributeName: 'data-theme',
  themes: ['catppuccin-latte', 'catppuccin-mocha']
});
---

<html data-theme={theme}>
  <head>
    <!-- Theme CSS will be injected here -->
    <!-- obiente-theme-inject -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### SvelteKit

```javascript
// src/hooks.server.js
import { getThemeFromSvelteKitRequest } from '@obiente/themes/rollup';

export async function handle({ event, resolve }) {
  const theme = getThemeFromSvelteKitRequest(event.request, {
    cookieName: 'obiente-theme',
    defaultTheme: 'catppuccin-latte',
    attributeName: 'data-theme',
    themes: ['catppuccin-latte', 'catppuccin-mocha']
  });

  event.locals.theme = theme;

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('%theme%', theme);
    }
  });
}
```

## Configuration Options

```typescript
interface ObienteThemeOptions {
  include?: string | string[];           // Files to process
  exclude?: string | string[];           // Files to exclude
  themes?: string[];                     // Available themes
  defaultTheme?: string;                 // Default theme
  cookieName?: string;                   // Cookie name for persistence
  attributeName?: string;                // HTML attribute name
  generateManifest?: boolean;            // Generate themes manifest
  ssrSupport?: boolean;                  // Enable SSR helpers
}
```

## Generated Files

The plugin generates several files in your build output:

- `themes/{theme-name}.css` - CSS for each theme
- `themes/manifest.json` - Theme metadata
- `obiente-theme-manager.js` - Client-side theme manager
- `obiente-theme-init.js` - Initialization script

## API Reference

### ObienteThemeManager

```typescript
class ObienteThemeManager {
  setTheme(theme: string): void;
  getCurrentTheme(): string;
  getAvailableThemes(): string[];
  toggleTheme(): void;
  onThemeChange(callback: (event: CustomEvent) => void): () => void;
}
```

### SSR Helpers

```typescript
function getThemeFromRequest(request: RequestLike, options: SSRThemeOptions): string;
function injectThemeIntoHTML(html: string, theme: string, attributeName?: string): string;
function generateThemePreload(theme: string): string;
function generateThemeLinks(themes: string[], activeTheme: string): string;
```
