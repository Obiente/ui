<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
import { computed } from 'vue'

export interface NumberInputProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current value
   */
  value?: number | string
  
  /**
   * Minimum value
   */
  min?: number
  
  /**
   * Maximum value
   */
  max?: number
  
  /**
   * Step increment
   */
  step?: number
  
  /**
   * Number of decimal places
   */
  precision?: number
  
  /**
   * Clamp value to min/max bounds
   */
  clampValueOnBlur?: boolean
  
  /**
   * Allow mouse wheel
   */
  allowMouseWheel?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<NumberInputProps>(), {
  themeClasses: '',
  value: '',
  min: undefined,
  max: undefined,
  step: 1,
  precision: undefined,
  clampValueOnBlur: true,
  allowMouseWheel: true,
  disabled: false,
  readOnly: false,
  placeholder: 'Enter a number',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: number | string]
  'value-change': [details: { value: string; valueAsNumber: number }]
  'value-invalid': [details: { reason: string }]
  focus: []
  blur: []
}>()

/**
 * Generate number input classes for theme system
 */
const numberInputClasses = computed(() => {
  const classes = ['oi-number-input']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-number-input--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-number-input--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-number-input--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-number-input--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string; valueAsNumber: number }) => {
  emit('update:value', details.valueAsNumber)
  emit('value-change', details)
}

/**
 * Handle invalid value
 */
const handleValueInvalid = (details: { reason: string }) => {
  emit('value-invalid', details)
}
</script>

<template>
  <NumberInput.Root
    :class="numberInputClasses"
    :value="value"
    :min="min"
    :max="max"
    :step="step"
    :precision="precision"
    :clamp-value-on-blur="clampValueOnBlur"
    :allow-mouse-wheel="allowMouseWheel"
    :disabled="disabled"
    :read-only="readOnly"
    @value-change="handleValueChange"
    @value-invalid="handleValueInvalid"
  >
    <NumberInput.Label v-if="$slots.label" class="oi-number-input-label">
      <slot name="label" />
    </NumberInput.Label>
    
    <NumberInput.Control class="oi-number-input-control">
      <NumberInput.DecrementTrigger class="oi-number-input-decrement">
        <slot name="decrementIcon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-number-input-icon">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </slot>
      </NumberInput.DecrementTrigger>
      
      <NumberInput.Input
        class="oi-number-input-field"
        :placeholder="placeholder"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
      
      <NumberInput.IncrementTrigger class="oi-number-input-increment">
        <slot name="incrementIcon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-number-input-icon">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </slot>
      </NumberInput.IncrementTrigger>
    </NumberInput.Control>
    
    <NumberInput.Scrubber class="oi-number-input-scrubber" />
  </NumberInput.Root>
</template>


