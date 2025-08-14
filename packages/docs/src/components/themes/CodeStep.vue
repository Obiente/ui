<template>
  <Stack :gap="1">
    <span>{{ title }}</span>
    <Badge variant="secondary">
      {{ code }}
    </Badge>
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Badge } from '@obiente/ui'

interface Props {
  title: string
  code: string
}

defineProps<Props>()
</script>
