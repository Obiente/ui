<template>
  <div
    :class="[
      'oi-bg-warning',
      'oi-text-foreground',
      'oi-border',
      'oi-rounded-md',
      'oi-px-4',
      'oi-py-3',
      'oi-shadow-lg',
      $attrs.class,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed for basic alert
</script>
