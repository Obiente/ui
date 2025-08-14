<template>
  <Stack :gap="3" align="center">
    <Badge variant="primary" size="lg">🎨</Badge>
    <Stack :gap="1" align="center">
      <h1>
        Theme System
      </h1>
      <p>
        Beautiful Catppuccin color themes with full dark/light mode support. 
        Switch themes in real-time and see how components adapt.
      </p>
    </Stack>
    <ThemeSwitch />
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Badge } from '@obiente/ui'
import ThemeSwitch from '../ThemeSwitch.vue'
</script>
