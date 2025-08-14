<template>
  <Flex justify="space-between" align="center">
    <Badge variant="outline">
      {{ variable.name }}
    </Badge>
    <span>
      {{ variable.description }}
    </span>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Badge } from '@obiente/ui'

interface Props {
  variable: {
    name: string
    description: string
  }
}

defineProps<Props>()
</script>
