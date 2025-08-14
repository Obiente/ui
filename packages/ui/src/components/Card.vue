<template>
  <div :class="[
    'oi-bg-surface',
    'oi-rounded-lg',
    'oi-border',
    'oi-transition-all',
    shadowClass,
    paddingClass,
    interactive ? 'oi-cursor-pointer oi-hover-opacity-75' : '',
    $attrs.class
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ 
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}>(), {
  variant: 'default',
  padding: 'md',
  interactive: false
})

const shadowClass = computed(() => {
  switch (props.variant) {
    case 'elevated':
      return 'oi-shadow-xl'
    case 'outlined':
      return 'oi-shadow-none oi-border-2'
    default:
      return 'oi-shadow-md'
  }
})

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'sm':
      return 'oi-p-3'
    case 'lg':
      return 'oi-p-6'
    default:
      return 'oi-p-4'
  }
})
</script>
