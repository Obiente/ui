<template>
  <button
    v-bind="$attrs"
    :class="[
      'oi-btn',
      sizeClasses,
      variantClasses,
      disabled ? 'oi-disabled' : '',
      loading ? 'oi-btn-loading' : '',
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
      return 'oi-btn-xs'
    case 'sm':
      return 'oi-btn-sm'
    case 'lg':
      return 'oi-btn-lg'
    case 'xl':
      return 'oi-btn-xl'
    default:
      return 'oi-btn-md'
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
      return 'oi-btn-secondary'
    case 'outline':
      return 'oi-btn-outline'
    case 'ghost':
      return 'oi-btn-ghost'
    case 'destructive':
      return 'oi-btn-danger'
    default:
      return 'oi-btn-primary'
  }
})
</script>
