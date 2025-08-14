<template>
  <textarea
    v-bind="$attrs"
    :class="[
      'oi-bg-surface',
      'oi-text-foreground',
      'oi-border',
      'oi-rounded-md',
      'oi-px-3',
      'oi-py-2',
      'oi-w-full',
      error ? 'oi-border-error' : '',
      disabled ? 'oi-opacity-50' : '',
      $attrs.class
    ]"
    :disabled="disabled"
    :aria-invalid="error ? 'true' : undefined"
  />
</template>

<script setup lang="ts">
defineProps<{ error?: boolean; disabled?: boolean }>();
</script>
