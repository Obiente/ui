<template>
  <div class="brand-section">
    <button class="brand-button" @click="$emit('navigate', '/')">
      <Flex align="center" :gap="0.75" themeClasses="brand-content">
        <div class="brand-icon">✨</div>
        <span class="brand-text">Obiente UI</span>
      </Flex>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { Flex } from "@obiente/ui";

  defineEmits<{
    navigate: [path: string];
  }>();
</script>
