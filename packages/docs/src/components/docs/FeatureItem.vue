<template>
  <Flex align="center" :gap="1">
    <Badge :variant="variant" size="sm">{{ icon }}</Badge>
    <Stack :gap="0.25">
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </Stack>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Badge, Stack } from '@obiente/ui'

interface Props {
  icon: string
  variant: string
  title: string
  description: string
}

defineProps<Props>()
</script>
