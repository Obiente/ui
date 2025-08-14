<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { computed } from 'vue'

export interface CircularProgressProps {
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
   * Indeterminate state
   */
  indeterminate?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'thick' | 'thin'
  
  /**
   * Color scheme (semantic for theme system)
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CircularProgressProps>(), {
  themeClasses: '',
  value: undefined,
  min: 0,
  max: 100,
  indeterminate: false,
  size: 'md',
  variant: 'default',
  colorScheme: 'primary',
  customClasses: ''
})

/**
 * Generate circular progress classes for theme system
 */
const circularProgressClasses = computed(() => {
  const classes = ['oi-circular-progress']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-circular-progress--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-circular-progress--${props.size}`)
  
  // Add color scheme class
  classes.push(`oi-circular-progress--${props.colorScheme}`)
  
  if (props.indeterminate) {
    classes.push('oi-circular-progress--indeterminate')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Progress.Root
    :class="circularProgressClasses"
    :value="value"
    :min="min"
    :max="max"
  >
    <Progress.Label v-if="$slots.label" class="oi-circular-progress-label">
      <slot name="label" />
    </Progress.Label>
    
    <div class="oi-circular-progress-circle">
      <Progress.Track class="oi-circular-progress-track" />
      <Progress.Range class="oi-circular-progress-range" />
    </div>
    
    <Progress.ValueText v-if="$slots.valueText" class="oi-circular-progress-value">
      <slot name="valueText" :value="value" :min="min" :max="max" />
    </Progress.ValueText>
    
    <div v-if="$slots.content" class="oi-circular-progress-content">
      <slot name="content" :value="value" :min="min" :max="max" />
    </div>
  </Progress.Root>
</template>


