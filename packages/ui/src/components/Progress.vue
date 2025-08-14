<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { computed } from 'vue'

export interface ProgressProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current progress value
   */
  value?: number
  
  /**
   * Minimum value
   */
  min?: number
  
  /**
   * Maximum value
   */
  max?: number
  
  /**
   * Progress variant (semantic for theme system)
   */
  variant?: 'default' | 'striped' | 'animated'
  
  /**
   * Progress size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Progress color scheme (semantic for theme system)
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<ProgressProps>(), {
  themeClasses: '',
  value: 0,
  min: 0,
  max: 100,
  variant: 'default',
  size: 'md',
  colorScheme: 'primary',
  customClasses: ''
})

/**
 * Generate progress classes for theme system
 */
const progressClasses = computed(() => {
  const classes = ['oi-progress']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-progress--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-progress--${props.size}`)
  
  // Add color scheme class
  classes.push(`oi-progress--${props.colorScheme}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Progress.Root
    :class="progressClasses"
    :value="value"
    :min="min"
    :max="max"
  >
    <Progress.Label v-if="$slots.label" class="oi-progress-label">
      <slot name="label" />
    </Progress.Label>
    
    <Progress.ValueText v-if="$slots.valueText" class="oi-progress-value">
      <slot name="valueText" :value="value" :min="min" :max="max" />
    </Progress.ValueText>
    
    <Progress.Track class="oi-progress-track">
      <Progress.Range class="oi-progress-range" />
    </Progress.Track>
  </Progress.Root>
</template>


