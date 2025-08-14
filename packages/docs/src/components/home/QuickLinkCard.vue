<template>
  <Card 
   
    @click="$emit('click')"
  >
    <Stack :gap="1.5" align="center">
      <Badge :variant="variant" size="lg">
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

defineEmits<{
  click: []
}>()
</script>
