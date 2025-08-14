<template>
  <Flex align="center" :gap="0.75">
    <Badge :variant="variant">{{ icon }}</Badge>
    <h2>{{ title }}</h2>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Badge } from '@obiente/ui'

interface Props {
  icon: string
  title: string
  variant: string
}

defineProps<Props>()
</script>
