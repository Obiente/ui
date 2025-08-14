<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { computed } from 'vue'

export interface FieldProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Field ID
   */
  id?: string
  
  /**
   * Required state
   */
  required?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Invalid state
   */
  invalid?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
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

const props = withDefaults(defineProps<FieldProps>(), {
  themeClasses: '',
  id: undefined,
  required: false,
  disabled: false,
  invalid: false,
  readOnly: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate field classes for theme system
 */
const fieldClasses = computed(() => {
  const classes = ['oi-field']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-field--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-field--${props.size}`)
  
  if (props.required) {
    classes.push('oi-field--required')
  }
  
  if (props.disabled) {
    classes.push('oi-field--disabled')
  }
  
  if (props.invalid) {
    classes.push('oi-field--invalid')
  }
  
  if (props.readOnly) {
    classes.push('oi-field--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Field.Root
    :class="fieldClasses"
    :id="id"
    :required="required"
    :disabled="disabled"
    :invalid="invalid"
    :read-only="readOnly"
  >
    <Field.Label v-if="$slots.label" class="oi-field-label">
      <slot name="label" />
      <span v-if="required" class="oi-field-required-indicator">*</span>
    </Field.Label>
    
        <Field.Input class="oi-field-input">
      <slot name="input" />
    </Field.Input>
    
    <Field.HelperText v-if="$slots.helperText" class="oi-field-helper-text">
      <slot name="helperText" />
    </Field.HelperText>
    
    <Field.ErrorText v-if="$slots.errorText" class="oi-field-error-text">
      <slot name="errorText" />
    </Field.ErrorText>
  </Field.Root>
</template>


