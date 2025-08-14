<template>
  <Grid :cols="{ base: 1, sm: 2, md: 3 }" :gap="4">
    <QuickLinkCard 
      v-for="link in quickLinks"
      :key="link.title"
      v-bind="link"
      @click="navigate(link.path)"
    />
  </Grid>
</template>

<script setup lang="ts">
import { Grid } from '@obiente/ui'
import QuickLinkCard from './QuickLinkCard.vue'

const quickLinks = [
  {
    icon: '📚',
    title: 'Components',
    description: 'Browse all available components',
    variant: 'secondary',
    path: '/components'
  },
  {
    icon: '🎨',
    title: 'Themes',
    description: 'Explore Catppuccin themes',
    variant: 'success',
    path: '/themes'
  },
  {
    icon: '🛝',
    title: 'Playground',
    description: 'Interactive component demos',
    variant: 'warning',
    path: '/playground'
  }
]

const navigate = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path
  }
}
</script>
