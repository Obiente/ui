<template>
  <Stack :gap="4" align="center">
    <AnimatedLogo />
    <Stack :gap="1" align="center">
      <h1>
        Obiente UI
      </h1>
      <p>
        A modern Vue 3 component library with extensive theming support, 
        built on Ark UI and designed for accessibility and developer experience.
      </p>
    </Stack>
    <HeroActions />
    <QuickLinks />
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import AnimatedLogo from './AnimatedLogo.vue'
import HeroActions from './HeroActions.vue'
import QuickLinks from './QuickLinks.vue'
</script>
