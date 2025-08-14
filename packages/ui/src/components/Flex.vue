<template>
  <div :class="['oi-flex', directionClass, alignClass, gapClass, $attrs.class]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  gap?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'row',
  align: 'center',
  gap: 0,
});

// Convert direction to CSS class
const directionClass = computed(() => {
  switch (props.direction) {
    case 'column': return 'oi-flex-col';
    case 'row-reverse': return 'oi-flex-row-reverse';
    case 'column-reverse': return 'oi-flex-col-reverse';
    default: return 'oi-flex-row';
  }
});

// Convert align to CSS class
const alignClass = computed(() => {
  switch (props.align) {
    case 'start': return 'oi-items-start';
    case 'end': return 'oi-items-end';
    case 'center': return 'oi-items-center';
    case 'stretch': return 'oi-items-stretch';
    case 'baseline': return 'oi-items-baseline';
    default: return 'oi-items-center';
  }
});

// Convert gap to CSS class
const gapClass = computed(() => {
  if (typeof props.gap === 'number' && props.gap > 0) {
    return `oi-gap-${Math.max(1, Math.min(4, Math.round(props.gap)))}`;
  }
  return '';
});
</script>
