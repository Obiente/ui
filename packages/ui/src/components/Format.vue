<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import { computed } from 'vue'

export interface FormatProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Value to format
   */
  value?: number | Date | string
  
  /**
   * Format type
   */
  type?: 'number' | 'date' | 'time' | 'currency' | 'percent' | 'relative-time' | 'list' | 'unit'
  
  /**
   * Locale for formatting
   */
  locale?: string
  
  /**
   * Format options
   */
  options?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions | any
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'monospace' | 'emphasized'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<FormatProps>(), {
  themeClasses: '',
  value: '',
  type: 'number',
  locale: 'en-US',
  options: () => ({}),
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate format classes for theme system
 */
const formatClasses = computed(() => {
  const classes = ['oi-format']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-format--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-format--${props.size}`)
  
  // Add type class
  classes.push(`oi-format--${props.type}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Format.Root
    :class="formatClasses"
    :value="value"
    :type="type"
    :locale="locale"
    :options="options"
  >
    <Format.Context>
      <template #default="{ formattedValue, parts }">
        <slot name="formatted" :value="formattedValue" :parts="parts">
          {{ formattedValue }}
        </slot>
      </template>
    </Format.Context>
  </Format.Root>
</template>


