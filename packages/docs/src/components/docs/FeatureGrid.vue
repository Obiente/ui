<template>
  <Grid :cols="{ base: 1, md: 2 }" :gap="2">
    <FeatureItem 
      v-for="feature in features" 
      :key="feature.title"
      v-bind="feature"
    />
  </Grid>
</template>

<script setup lang="ts">
import { Grid } from '@obiente/ui'
import FeatureItem from './FeatureItem.vue'

const features = [
  {
    icon: '🎨',
    variant: 'primary',
    title: 'Theme Classes',
    description: 'Apply consistent styling with theme-specific classes'
  },
  {
    icon: '♿',
    variant: 'success',
    title: 'Accessibility',
    description: 'Built with Ark UI for full a11y support'
  },
  {
    icon: '🔧',
    variant: 'warning',
    title: 'Customizable',
    description: 'Override styles and behaviors as needed'
  },
  {
    icon: '📱',
    variant: 'secondary',
    title: 'Responsive',
    description: 'Mobile-first responsive design patterns'
  }
]
</script>
