<template>
  <Grid :cols="{ base: 1, md: 2, lg: 3 }" :gap="2">
    <CategoryCard 
      v-for="category in categories" 
      :key="category.title"
      v-bind="category"
    />
  </Grid>
</template>

<script setup lang="ts">
import { Grid } from '@obiente/ui'
import CategoryCard from './CategoryCard.vue'

const categories = [
  {
    icon: '🏗️',
    title: 'Layout',
    description: 'Components for structuring and organizing your content',
    variant: 'primary',
    components: ['Container', 'Grid', 'Flex', 'Stack']
  },
  {
    icon: '📝',
    title: 'Forms',
    description: 'Interactive form controls and input components',
    variant: 'secondary',
    components: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch']
  },
  {
    icon: '💬',
    title: 'Feedback',
    description: 'Components for displaying status and notifications',
    variant: 'success',
    components: ['Alert', 'Badge']
  }
]
</script>
