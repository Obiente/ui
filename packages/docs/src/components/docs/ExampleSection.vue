<template>
  <Card>
    <Stack :gap="3">
      <Stack :gap="0.5">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </Stack>
      
      <LiveExample 
        :component-name="componentName"
        :variant="variant"
      />
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack } from '@obiente/ui'
import LiveExample from './LiveExample.vue'

interface Props {
  title: string
  description: string
  componentName: string
  variant: string
}

defineProps<Props>()
</script>
