<template>
  <Card>
    <Stack :gap="4">
      <Stack :gap="1">
        <h2>Using Themes</h2>
        <p>
          How to implement and use themes in your application
        </p>
      </Stack>
      
      <UsageExample />
      
      <Flex :gap="2">
        <Button variant="primary" @click="openPlayground">
          Try in Playground
        </Button>
        <Button variant="outline" @click="viewComponents">
          View Components
        </Button>
      </Flex>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Flex, Button } from '@obiente/ui'
import UsageExample from './UsageExample.vue'

const openPlayground = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/playground'
  }
}

const viewComponents = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/components'
  }
}
</script>
