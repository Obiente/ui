<template>
  <Card>
    <Stack :gap="1.5">
      <CategoryHeader :icon="icon" :title="title" :variant="variant" />
      <p>{{ description }}</p>
      <ComponentLinks :components="components" />
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack } from '@obiente/ui'
import CategoryHeader from './CategoryHeader.vue'
import ComponentLinks from './ComponentLinks.vue'

interface Props {
  icon: string
  title: string
  description: string
  variant: string
  components: string[]
}

defineProps<Props>()
</script>
