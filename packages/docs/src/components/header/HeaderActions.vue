<template>
  <div class="header-actions">
    <Flex align="center" :gap="0.5" themeClasses="actions-list">
      <div class="action-item">
        <ThemeSwitch />
      </div>
      <div class="action-item">
        <GitHubButton />
      </div>
    </Flex>
  </div>
</template>

<script setup lang="ts">
import { Flex } from '@obiente/ui'
import ThemeSwitch from '../ThemeSwitch.vue'
import GitHubButton from './GitHubButton.vue'
</script>


