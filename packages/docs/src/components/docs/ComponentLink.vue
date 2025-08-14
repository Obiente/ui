<template>
  <Button 
    variant="ghost" 
    size="sm" 
   
    @click="navigate"
  >
    <Flex justify="space-between" align="center">
      <span>{{ name }}</span>
      <span>→</span>
    </Flex>
  </Button>
</template>

<script setup lang="ts">
import { Button, Flex } from '@obiente/ui'

interface Props {
  name: string
}

const props = defineProps<Props>()

const navigate = () => {
  const path = `/components/${props.name.toLowerCase()}`
  if (typeof window !== 'undefined') {
    window.location.href = path
  }
}
</script>
