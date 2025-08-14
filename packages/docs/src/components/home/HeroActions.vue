<template>
  <Flex :gap="2">
    <Button 
      variant="primary" 
      size="lg"
     
      @click="navigate('/components')"
    >
      Get Started
    </Button>
    <Button 
      variant="outline" 
      size="lg"
     
      @click="navigate('/playground')"
    >
      Try Playground
    </Button>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Button } from '@obiente/ui'

const navigate = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path
  }
}
</script>
