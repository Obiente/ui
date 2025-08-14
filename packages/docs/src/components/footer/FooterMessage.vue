<template>
  <Stack :gap="0.5" align="center">
    <Flex align="center" :gap="0.5">
      <span>Built with</span>
      <Badge variant="primary" size="sm">❤️</Badge>
      <span>using</span>
    </Flex>
    <Flex align="center" :gap="1">
      <Badge variant="secondary" size="sm">Astro</Badge>
      <Badge variant="secondary" size="sm">Vue 3</Badge>
      <Badge variant="primary" size="sm">Obiente UI</Badge>
    </Flex>
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Flex, Badge } from '@obiente/ui'
</script>
