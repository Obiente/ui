<script setup lang="ts">
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { computed } from 'vue'

export interface SegmentOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentGroupProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected value
   */
  value?: string
  
  /**
   * Available options
   */
  options?: SegmentOption[]
  
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'outlined' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SegmentGroupProps>(), {
  themeClasses: '',
  value: '',
  options: () => [],
  orientation: 'horizontal',
  disabled: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'value-change': [details: { value: string }]
  'focus-change': [details: { value: string | null }]
}>()

/**
 * Generate segment group classes for theme system
 */
const segmentGroupClasses = computed(() => {
  const classes = ['oi-segment-group']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-segment-group--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-segment-group--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-segment-group--${props.orientation}`)
  
  if (props.disabled) {
    classes.push('oi-segment-group--disabled')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}

/**
 * Handle focus change
 */
const handleFocusChange = (details: { value: string | null }) => {
  emit('focus-change', details)
}
</script>

<template>
  <SegmentGroup.Root
    :class="segmentGroupClasses"
    :value="value"
    :orientation="orientation"
    :disabled="disabled"
    @value-change="handleValueChange"
    @focus-change="handleFocusChange"
  >
    <SegmentGroup.Indicator class="oi-segment-group-indicator" />
    
    <SegmentGroup.Item
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      class="oi-segment-group-item"
    >
      <SegmentGroup.ItemText class="oi-segment-group-item-text">
        {{ option.label }}
      </SegmentGroup.ItemText>
      <SegmentGroup.ItemControl class="oi-segment-group-item-control" />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>


