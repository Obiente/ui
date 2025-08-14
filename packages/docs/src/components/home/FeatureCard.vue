<template>
  <Card>
    <Stack :gap="1" align="center">
      <Badge :variant="variant">
        {{ icon }}
      </Badge>
      <h3>{{ title }}</h3>
      <p>
        {{ description }}
      </p>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Badge } from '@obiente/ui'

interface Props {
  icon: string
  title: string
  description: string
  variant: string
}

defineProps<Props>()
</script>
