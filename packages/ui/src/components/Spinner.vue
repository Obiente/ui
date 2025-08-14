<script setup lang="ts">
import { computed } from 'vue'

export interface SpinnerProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Spinner label for accessibility
   */
  label?: string
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'dots' | 'pulse' | 'bars'
  
  /**
   * Color scheme (semantic for theme system)
   */
  colorScheme?: 'primary' | 'secondary' | 'neutral'
  
  /**
   * Speed of animation
   */
  speed?: 'slow' | 'normal' | 'fast'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  themeClasses: '',
  label: 'Loading...',
  size: 'md',
  variant: 'default',
  colorScheme: 'primary',
  speed: 'normal',
  customClasses: ''
})

/**
 * Generate spinner classes for theme system
 */
const spinnerClasses = computed(() => {
  const classes = ['oi-spinner']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-spinner--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-spinner--${props.size}`)
  
  // Add color scheme class
  classes.push(`oi-spinner--${props.colorScheme}`)
  
  // Add speed class
  classes.push(`oi-spinner--${props.speed}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <div
    :class="spinnerClasses"
    role="status"
    :aria-label="label"
  >
    <template v-if="variant === 'dots'">
      <div class="oi-spinner-dot oi-spinner-dot-1"></div>
      <div class="oi-spinner-dot oi-spinner-dot-2"></div>
      <div class="oi-spinner-dot oi-spinner-dot-3"></div>
    </template>
    
    <template v-else-if="variant === 'bars'">
      <div class="oi-spinner-bar oi-spinner-bar-1"></div>
      <div class="oi-spinner-bar oi-spinner-bar-2"></div>
      <div class="oi-spinner-bar oi-spinner-bar-3"></div>
      <div class="oi-spinner-bar oi-spinner-bar-4"></div>
    </template>
    
    <template v-else-if="variant === 'pulse'">
      <div class="oi-spinner-pulse"></div>
    </template>
    
    <template v-else>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        class="oi-spinner-circle"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          class="oi-spinner-track"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          class="oi-spinner-path"
        />
      </svg>
    </template>
    
    <span class="oi-spinner-sr-only">{{ label }}</span>
  </div>
</template>


