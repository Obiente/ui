<template>
  <Flex :gap="1">
    <ColorSwatch 
      v-for="(color, name) in colors"
      :key="name"
      :color="color"
      :name="name"
    />
  </Flex>
</template>

<script setup lang="ts">
import { Flex } from '@obiente/ui'
import ColorSwatch from './ColorSwatch.vue'

interface Props {
  colors: Record<string, string>
}

defineProps<Props>()
</script>
