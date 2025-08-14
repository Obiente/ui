<template>
  <Stack :gap="0.75">
    <ComponentLink 
      v-for="component in components" 
      :key="component"
      :name="component"
    />
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import ComponentLink from './ComponentLink.vue'

interface Props {
  components: string[]
}

defineProps<Props>()
</script>
