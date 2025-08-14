<template>
  <Stack :gap="4">
    <Stack :gap="1" align="center">
      <h2>
        Why Choose Obiente UI?
      </h2>
      <p>
        Built with modern web standards and developer experience in mind
      </p>
    </Stack>
    
    <Grid :cols="{ base: 1, md: 2, lg: 4 }" :gap="3">
      <FeatureCard 
        v-for="feature in features"
        :key="feature.title"
        v-bind="feature"
      />
    </Grid>
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Grid } from '@obiente/ui'
import FeatureCard from './FeatureCard.vue'

const features = [
  {
    icon: '🎨',
    title: 'Theme System',
    description: 'Comprehensive theming with Catppuccin color palettes',
    variant: 'primary'
  },
  {
    icon: '♿',
    title: 'Accessible',
    description: 'Built on Ark UI for complete accessibility support',
    variant: 'success'
  },
  {
    icon: '⚡',
    title: 'Fast',
    description: 'Optimized for performance with Vue 3 and Vite',
    variant: 'warning'
  },
  {
    icon: '🔧',
    title: 'Customizable',
    description: 'Flexible components that adapt to your needs',
    variant: 'secondary'
  }
]
</script>
