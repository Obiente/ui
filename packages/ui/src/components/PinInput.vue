<script setup lang="ts">
import { PinInput } from '@ark-ui/vue/pin-input'
import { computed } from 'vue'

export interface PinInputProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current value
   */
  value?: string[]
  
  /**
   * Number of input fields
   */
  length?: number
  
  /**
   * Input type
   */
  type?: 'alphanumeric' | 'numeric' | 'alphabetic'
  
  /**
   * Mask input values
   */
  mask?: boolean
  
  /**
   * Placeholder character
   */
  placeholder?: string
  
  /**
   * One-time password mode
   */
  otp?: boolean
  
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
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<PinInputProps>(), {
  themeClasses: '',
  value: () => [],
  length: 4,
  type: 'alphanumeric',
  mask: false,
  placeholder: '○',
  otp: false,
  disabled: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string[]]
  'value-change': [details: { value: string[]; valueAsString: string }]
  complete: [details: { value: string[]; valueAsString: string }]
  'value-invalid': [details: { value: string; index: number }]
}>()

/**
 * Generate pin input classes for theme system
 */
const pinInputClasses = computed(() => {
  const classes = ['oi-pin-input']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-pin-input--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-pin-input--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-pin-input--disabled')
  }
  
  if (props.mask) {
    classes.push('oi-pin-input--masked')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string[]; valueAsString: string }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}

/**
 * Handle completion
 */
const handleComplete = (details: { value: string[]; valueAsString: string }) => {
  emit('complete', details)
}

/**
 * Handle invalid value
 */
const handleValueInvalid = (details: { value: string; index: number }) => {
  emit('value-invalid', details)
}
</script>

<template>
  <PinInput.Root
    :class="pinInputClasses"
    :value="value"
    :length="length"
    :type="type"
    :mask="mask"
    :placeholder="placeholder"
    :otp="otp"
    :disabled="disabled"
    @value-change="handleValueChange"
    @value-complete="handleComplete"
    @value-invalid="handleValueInvalid"
  >
    <PinInput.Label v-if="$slots.label" class="oi-pin-input-label">
      <slot name="label" />
    </PinInput.Label>
    
    <PinInput.Control class="oi-pin-input-control">
      <PinInput.Input
        v-for="(id, index) in length"
        :key="id"
        :index="index"
        class="oi-pin-input-field"
      />
    </PinInput.Control>
    
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>


