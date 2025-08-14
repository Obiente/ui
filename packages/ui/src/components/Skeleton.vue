<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Loading state
   */
  loading?: boolean
  
  /**
   * Width of skeleton
   */
  width?: string | number
  
  /**
   * Height of skeleton
   */
  height?: string | number
  
  /**
   * Animation type
   */
  animation?: 'pulse' | 'wave' | 'none'
  
  /**
   * Shape variant
   */
  shape?: 'rectangle' | 'circle' | 'rounded'
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'text' | 'avatar' | 'card'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  themeClasses: '',
  loading: true,
  width: '100%',
  height: '1rem',
  animation: 'pulse',
  shape: 'rectangle',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate skeleton classes for theme system
 */
const skeletonClasses = computed(() => {
  const classes = ['oi-skeleton']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-skeleton--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-skeleton--${props.size}`)
  
  // Add shape class
  classes.push(`oi-skeleton--${props.shape}`)
  
  // Add animation class
  classes.push(`oi-skeleton--${props.animation}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Generate skeleton styles
 */
const skeletonStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (typeof props.width === 'number') {
    styles.width = `${props.width}px`
  } else if (typeof props.width === 'string') {
    styles.width = props.width
  }
  
  if (typeof props.height === 'number') {
    styles.height = `${props.height}px`
  } else if (typeof props.height === 'string') {
    styles.height = props.height
  }
  
  return styles
})
</script>

<template>
  <template v-if="loading">
    <div
      :class="skeletonClasses"
      :style="skeletonStyles"
      role="status"
      aria-label="Loading..."
    >
      <span class="oi-skeleton-sr-only">Loading...</span>
    </div>
  </template>
  
  <template v-else>
    <slot />
  </template>
</template>


