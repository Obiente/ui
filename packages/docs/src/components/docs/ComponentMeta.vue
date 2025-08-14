<template>
  <Flex :gap="1">
    <Badge variant="secondary">
      {{ category }}
    </Badge>
    <Badge variant="outline">
      Since v1.0.0
    </Badge>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Badge } from '@obiente/ui'

interface Props {
  category: string
}

defineProps<Props>()
</script>
