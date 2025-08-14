<template>
  <Stack :gap="1">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'

interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>
