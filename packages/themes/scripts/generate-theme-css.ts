#!/usr/bin/env tsx

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { getAllThemes } from '../src/index.js'

/**
 * Generate static CSS files for all themes
 * This replaces the runtime CSS custom property setting with build-time generation
 */
function generateThemeCSS() {
  const outputDir = join(process.cwd(), 'dist')
  mkdirSync(outputDir, { recursive: true })

  const themes = getAllThemes()

  // Generate combined themes.css file
  let combinedCSS = `/* Auto-generated theme CSS - DO NOT EDIT MANUALLY */\n\n`

  themes.forEach(theme => {
    const selector = `:root[data-theme="${theme.id}"]`
    
    combinedCSS += `${selector} {\n`
    combinedCSS += `  /* ${theme.name} */\n`
    
    // Background colors
    combinedCSS += `  --oi-color-background: ${theme.colors.background};\n`
    combinedCSS += `  --oi-color-surface: ${theme.colors.surface.base};\n`
    
    // Text colors
    combinedCSS += `  --oi-color-text: ${theme.colors.text.primary};\n`
    combinedCSS += `  --oi-color-text-muted: ${theme.colors.text.secondary};\n`
    combinedCSS += `  --oi-color-text-subtle: ${theme.colors.text.tertiary};\n`
    
    // Primary colors
    combinedCSS += `  --oi-color-primary: ${theme.colors.accent.primary};\n`
    combinedCSS += `  --oi-color-primary-hover: ${theme.colors.interactive.hover};\n`
    
    // Accent colors  
    combinedCSS += `  --oi-color-accent: ${theme.colors.accent.secondary};\n`
    combinedCSS += `  --oi-color-success: ${theme.colors.accent.success};\n`
    combinedCSS += `  --oi-color-warning: ${theme.colors.accent.warning};\n`
    combinedCSS += `  --oi-color-error: ${theme.colors.accent.danger};\n`
    
    // Border colors
    combinedCSS += `  --oi-color-border: ${theme.colors.border.default};\n`
    combinedCSS += `  --oi-color-border-subtle: ${theme.colors.border.muted};\n`
    
    combinedCSS += `}\n\n`
  })

  // Write combined CSS file
  writeFileSync(join(outputDir, 'themes.css'), combinedCSS)

  // Generate individual theme CSS files (for CSS file swapping approach)
  themes.forEach(theme => {
    let themeCSS = `/* ${theme.name} Theme - Auto-generated */\n\n`
    themeCSS += `:root {\n`
    
    // Same variable assignments but without data-theme selector
    themeCSS += `  --oi-color-background: ${theme.colors.background};\n`
    themeCSS += `  --oi-color-surface: ${theme.colors.surface.base};\n`
    themeCSS += `  --oi-color-text: ${theme.colors.text.primary};\n`
    themeCSS += `  --oi-color-text-muted: ${theme.colors.text.secondary};\n`
    themeCSS += `  --oi-color-text-subtle: ${theme.colors.text.tertiary};\n`
    themeCSS += `  --oi-color-primary: ${theme.colors.accent.primary};\n`
    themeCSS += `  --oi-color-primary-hover: ${theme.colors.interactive.hover};\n`
    themeCSS += `  --oi-color-accent: ${theme.colors.accent.secondary};\n`
    themeCSS += `  --oi-color-success: ${theme.colors.accent.success};\n`
    themeCSS += `  --oi-color-warning: ${theme.colors.accent.warning};\n`
    themeCSS += `  --oi-color-error: ${theme.colors.accent.danger};\n`
    themeCSS += `  --oi-color-border: ${theme.colors.border.default};\n`
    themeCSS += `  --oi-color-border-subtle: ${theme.colors.border.muted};\n`
    themeCSS += `}\n`
    
    writeFileSync(join(outputDir, `${theme.id}.css`), themeCSS)
  })

  console.log(`✅ Generated CSS for ${themes.length} themes`)
  console.log(`📂 Output: ${outputDir}`)
  console.log(`🎨 Files: themes.css + ${themes.length} individual theme files`)
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemeCSS()
}

export { generateThemeCSS }
