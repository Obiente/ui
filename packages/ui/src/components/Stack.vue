<template>
  <div :class="['oi-flex', 'oi-flex-col', gapClass, $attrs.class]">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    gap?: number | string;
  }

  const props = withDefaults(defineProps<Props>(), {
    gap: 4,
  });

  // Convert spacing value to gap class
  const gapClass = computed(() => {
    if (typeof props.gap === "number") {
      return `oi-gap-${Math.max(1, Math.min(4, Math.round(props.gap)))}`; // Clamp between 1-4
    }
    return "oi-gap-4"; // Default
  });
</script>
