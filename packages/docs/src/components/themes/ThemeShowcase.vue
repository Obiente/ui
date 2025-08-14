<template>
  <Stack :gap="4">
    <h2>Available Themes</h2>
    
    <Grid :cols="{ base: 1, md: 2 }" :gap="4">
      <ThemeCard 
        v-for="theme in availableThemes"
        :key="theme.id"
        :theme="theme"
        @select="selectTheme"
      />
    </Grid>
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Grid, useThemeProvider } from '@obiente/ui'
import ThemeCard from './ThemeCard.vue'

const { changeTheme } = useThemeProvider()

const availableThemes = [
  {
    id: 'catppuccin-mocha',
    name: 'Mocha',
    description: 'A warm, dark theme perfect for nighttime coding',
    icon: '🌙',
    variant: 'primary',
    colors: {
      primary: '#89b4fa',
      secondary: '#cba6f7',
      background: '#1e1e2e',
      foreground: '#cdd6f4'
    }
  },
  {
    id: 'catppuccin-latte',
    name: 'Latte',
    description: 'A light, creamy theme for bright environments',
    icon: '☀️',
    variant: 'secondary',
    colors: {
      primary: '#1e66f5',
      secondary: '#8839ef',
      background: '#eff1f5',
      foreground: '#4c4f69'
    }
  },
  {
    id: 'catppuccin-frappe',
    name: 'Frappé',
    description: 'A cool, medium-dark theme with subtle colors',
    icon: '☁️',
    variant: 'success',
    colors: {
      primary: '#8caaee',
      secondary: '#ca9ee6',
      background: '#303446',
      foreground: '#c6d0f5'
    }
  },
  {
    id: 'catppuccin-macchiato',
    name: 'Macchiato',
    description: 'A rich, dark theme with warm undertones',
    icon: '☕',
    variant: 'warning',
    colors: {
      primary: '#8aadf4',
      secondary: '#c6a0f6',
      background: '#24273a',
      foreground: '#cad3f5'
    }
  }
]

const selectTheme = (themeId: string) => {
  changeTheme(themeId)
}
</script>
