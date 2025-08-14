<template>
  <Stack :gap="2">
    <InstallationStep 
      v-for="(step, index) in steps"
      :key="index"
      :number="index + 1"
      :title="step.title"
      :code="step.code"
    />
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import InstallationStep from './InstallationStep.vue'

const steps = [
  {
    title: 'Install the package',
    code: 'npm install @obiente/ui'
  },
  {
    title: 'Import and use components',
    code: 'import { Button, ThemeProvider } from "@obiente/ui"'
  },
  {
    title: 'Start building!',
    code: '<Button variant="primary">Hello World!</Button>'
  }
]
</script>
