<template>
  <Stack :gap="3">
    <h3>Available Variables</h3>
    
    <Stack :gap="1">
      <VariableItem 
        v-for="variable in themeVariables"
        :key="variable.name"
        :variable="variable"
      />
    </Stack>
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import VariableItem from './VariableItem.vue'

const themeVariables = [
  { name: '--color-primary', description: 'Primary brand color' },
  { name: '--color-secondary', description: 'Secondary brand color' },
  { name: '--color-background', description: 'Main background color' },
  { name: '--color-foreground', description: 'Main text color' },
  { name: '--color-muted', description: 'Muted text color' },
  { name: '--color-border', description: 'Border color' }
]
</script>
