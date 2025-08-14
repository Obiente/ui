<template>
  <Stack :gap="4">
    <h2>Examples</h2>
    
    <ExampleSection 
      v-for="example in examples"
      :key="example.title"
      :title="example.title"
      :description="example.description"
      :component-name="componentName"
      :variant="example.variant"
    />
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import ExampleSection from './ExampleSection.vue'

interface Props {
  componentName: string
}

const props = defineProps<Props>()

const examples = [
  {
    title: 'Basic Variants',
    description: 'Different visual styles for various use cases',
    variant: 'basic'
  },
  {
    title: 'Sizes',
    description: 'Available size variants from small to large',
    variant: 'sizes'
  },
  {
    title: 'States',
    description: 'Loading and disabled states for user feedback',
    variant: 'states'
  },
  {
    title: 'Interactive',
    description: 'Real-world component interactions and behaviors',
    variant: 'interactive'
  }
]
</script>
