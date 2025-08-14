<template>
  <button
    v-bind="$attrs"
    :class="[
      'oi-font-medium',
      'oi-rounded-md',
      'oi-border',
      'oi-transition-all',
      'oi-cursor-pointer',
      'oi-select-none',
      'oi-focus-ring',
      'oi-interactive',
      sizeClasses,
      variantClasses,
      disabled ? 'oi-disabled' : '',
      loading ? 'oi-cursor-default' : '',
      $attrs.class
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading ? 'true' : undefined"
    :aria-describedby="ariaDescribedby"
    type="button"
  >
    <!-- Loading spinner -->
    <svg 
      v-if="loading" 
      class="oi-animate-spin oi-mr-2" 
      :class="sizeIconClasses"
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle 
        class="oi-opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        stroke-width="4"
      ></circle>
      <path 
        class="oi-opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    
    <!-- Icon slot -->
    <span v-if="$slots.icon && !loading" class="oi-mr-2" aria-hidden="true">
      <slot name="icon" />
    </span>
    
    <!-- Button content -->
    <span :class="loading ? 'oi-opacity-75' : ''">
      <slot />
    </span>
    
    <!-- Screen reader loading text -->
    <span v-if="loading" class="oi-sr-only">Loading...</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ 
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ariaDescribedby?: string
}>(), {
  variant: 'primary',
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'oi-px-2 oi-py-1 oi-text-xs'
    case 'sm':
      return 'oi-px-3 oi-py-1 oi-text-sm'
    case 'lg':
      return 'oi-px-6 oi-py-3 oi-text-lg'
    case 'xl':
      return 'oi-px-8 oi-py-4 oi-text-xl'
    default:
      return 'oi-px-4 oi-py-2 oi-text-md'
  }
})

const sizeIconClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'oi-w-3 oi-h-3'
    case 'sm':
      return 'oi-w-4 oi-h-4'
    case 'lg':
      return 'oi-w-6 oi-h-6'
    case 'xl':
      return 'oi-w-7 oi-h-7'
    default:
      return 'oi-w-5 oi-h-5'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'oi-bg-secondary oi-text-background oi-border-secondary oi-shadow-md oi-hover-shadow'
    case 'outline':
      return 'oi-bg-background oi-text-primary oi-border-primary oi-shadow-sm oi-hover-shadow'
    case 'ghost':
      return 'oi-bg-background oi-text-foreground oi-border-0 oi-shadow-none oi-hover-opacity-75'
    case 'destructive':
      return 'oi-bg-error oi-text-background oi-border-error oi-shadow-md oi-hover-shadow'
    default:
      return 'oi-bg-primary oi-text-background oi-border-primary oi-shadow-md oi-hover-shadow'
  }
})
</script>
