<template>
  <Flex :gap="1">
    <Button variant="primary" @click="navigateToPlayground">
      Try Components
    </Button>
    <Button variant="outline" @click="navigateToThemes">
      Browse Themes
    </Button>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Button } from '@obiente/ui'

const navigateToPlayground = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/playground'
  }
}

const navigateToThemes = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/themes'
  }
}
</script>
