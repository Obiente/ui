<template>
  <div class="mobile-nav-toggle">
    <Button
      variant="ghost"
      size="sm"
      @click="toggleSidebar"
      class="mobile-toggle-button"
      themeClasses="toggle-btn"
    >
      <Flex align="center" :gap="2">
        <span class="toggle-icon">☰</span>
        <span class="toggle-text">Components</span>
      </Flex>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button, Flex } from '@obiente/ui'

const emit = defineEmits<{
  toggle: []
}>()

const toggleSidebar = () => {
  emit('toggle')
}
</script>


