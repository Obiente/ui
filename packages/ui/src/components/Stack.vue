<template>
  <div :class="['oi-flex', 'oi-flex-col', gapClass, $attrs.class]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  gap?: number | string;
  space?: number | string; // Alias for gap for backward compatibility
}

const props = withDefaults(defineProps<Props>(), {
  gap: 4,
  space: undefined,
});

// Use space prop if provided, otherwise use gap
const spacingValue = props.space ?? props.gap;

// Convert spacing value to gap class
const gapClass = computed(() => {
  if (typeof spacingValue === 'number') {
    return `oi-gap-${Math.max(1, Math.min(4, Math.round(spacingValue)))}`; // Clamp between 1-4
  }
  return 'oi-gap-4'; // Default
});
</script>
