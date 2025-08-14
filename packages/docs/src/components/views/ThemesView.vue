<template>
  <Container>
    <Stack :gap="6">
      <ThemesHeader />
      <ThemeShowcase />
      <ThemeCustomization />
      <ThemeUsage />
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { Container, Stack } from '@obiente/ui'
import ThemesHeader from '../themes/ThemesHeader.vue'
import ThemeShowcase from '../themes/ThemeShowcase.vue'
import ThemeCustomization from '../themes/ThemeCustomization.vue'
import ThemeUsage from '../themes/ThemeUsage.vue'
</script>
