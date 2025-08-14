<script setup lang="ts">
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { computed } from 'vue'

export interface ToggleOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ToggleGroupProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected values
   */
  value?: string[]
  
  /**
   * Available options
   */
  options?: ToggleOption[]
  
  /**
   * Multiple selection
   */
  multiple?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Loop focus
   */
  loopFocus?: boolean
  
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
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

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  themeClasses: '',
  value: () => [],
  options: () => [],
  multiple: false,
  disabled: false,
  loopFocus: true,
  orientation: 'horizontal',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string[]]
  'value-change': [details: { value: string[] }]
  'focus-change': [details: { value: string | null }]
}>()

/**
 * Generate toggle group classes for theme system
 */
const toggleGroupClasses = computed(() => {
  const classes = ['oi-toggle-group']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-toggle-group--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-toggle-group--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-toggle-group--${props.orientation}`)
  
  if (props.disabled) {
    classes.push('oi-toggle-group--disabled')
  }
  
  if (props.multiple) {
    classes.push('oi-toggle-group--multiple')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string[] }) => {
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
  <ToggleGroup.Root
    :class="toggleGroupClasses"
    :value="value"
    :multiple="multiple"
    :disabled="disabled"
    :loop-focus="loopFocus"
    :orientation="orientation"
    @value-change="handleValueChange"
    @focus-change="handleFocusChange"
  >
    <ToggleGroup.Item
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      class="oi-toggle-group-item"
    >
      {{ option.label }}
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>


