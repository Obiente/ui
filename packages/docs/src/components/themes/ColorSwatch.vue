<template>
  <Container 
   
    :style="{ backgroundColor: color }"
  >
    <Badge variant="outline" size="sm">
      {{ name }}
    </Badge>
  </Container>
</template>

<script setup lang="ts">
import { Container, Badge } from '@obiente/ui'

interface Props {
  color: string
  name: string
}

defineProps<Props>()
</script>
