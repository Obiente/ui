<template>
  <span :class="[
    'oi-font-medium',
    'oi-rounded-full',
    'oi-border',
    'oi-transition-colors',
    'oi-select-none',
    sizeClasses,
    variantClasses,
    $attrs.class
  ]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ 
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'secondary',
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'oi-px-2 oi-py-1 oi-text-xs'
    case 'lg':
      return 'oi-px-4 oi-py-2 oi-text-md'
    default:
      return 'oi-px-3 oi-py-1 oi-text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'oi-bg-primary oi-text-background oi-border-primary'
    case 'success':
      return 'oi-bg-success oi-text-background oi-border-success'
    case 'warning':
      return 'oi-bg-warning oi-text-background oi-border-warning'
    case 'error':
      return 'oi-bg-error oi-text-background oi-border-error'
    case 'outline':
      return 'oi-bg-background oi-text-foreground oi-border-muted'
    default:
      return 'oi-bg-secondary oi-text-background oi-border-secondary'
  }
})
</script>
