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
  type?: 'number' | 'currency' | 'percent' | 'relative-time' | 'bytes'
  
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

// Using Ark UI Format components
</script>

<template>
  <span :class="formatClasses">
    <Format.Number
      v-if="type === 'number' || type === 'currency' || type === 'percent'"
      :value="Number(value)"
      :locale="locale"
      v-bind="options"
    />
    <Format.RelativeTime
      v-else-if="type === 'relative-time'"
      :value="new Date(value)"
      :locale="locale"
    />
    <Format.Byte
      v-else-if="type === 'bytes'"
      :value="Number(value)"
      :locale="locale"
      v-bind="options"
    />
    <span v-else>
      <slot name="formatted" :value="value">
        {{ value }}
      </slot>
    </span>
  </span>
</template>


