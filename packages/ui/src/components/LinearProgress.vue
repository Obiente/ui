<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { computed } from 'vue'

export interface LinearProgressProps {
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
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'striped' | 'animated' | 'gradient'
  
  /**
   * Color scheme (semantic for theme system)
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<LinearProgressProps>(), {
  themeClasses: '',
  value: undefined,
  min: 0,
  max: 100,
  size: 'md',
  variant: 'default',
  colorScheme: 'primary',
  customClasses: ''
})

/**
 * Generate linear progress classes for theme system
 */
const linearProgressClasses = computed(() => {
  const classes = ['oi-linear-progress']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-linear-progress--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-linear-progress--${props.size}`)
  
  // Add color scheme class
  classes.push(`oi-linear-progress--${props.colorScheme}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Progress.Root
    :class="linearProgressClasses"
    :value="value"
    :min="min"
    :max="max"
  >
    <Progress.Label v-if="$slots.label" class="oi-linear-progress-label">
      <slot name="label" />
    </Progress.Label>

    <Progress.ValueText
      v-if="$slots.valueText"
      class="oi-linear-progress-value"
    >
      <slot name="valueText" :value="value" :min="min" :max="max" />
    </Progress.ValueText>

    <Progress.Track class="oi-linear-progress-track">
      <Progress.Range class="oi-linear-progress-range" />
    </Progress.Track>
  </Progress.Root>
</template>


