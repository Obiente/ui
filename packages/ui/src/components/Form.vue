<script setup lang="ts">
import { computed } from 'vue'

export interface FormProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Form method
   */
  method?: 'get' | 'post'
  
  /**
   * Form action URL
   */
  action?: string
  
  /**
   * Form encoding type
   */
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
  
  /**
   * No validate attribute
   */
  novalidate?: boolean
  
  /**
   * Auto complete behavior
   */
  autocomplete?: 'on' | 'off'
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  themeClasses: '',
  method: 'post',
  action: undefined,
  enctype: 'application/x-www-form-urlencoded',
  novalidate: false,
  autocomplete: 'on',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  submit: [event: Event]
  reset: [event: Event]
  invalid: [event: Event]
}>()

/**
 * Generate form classes for theme system
 */
const formClasses = computed(() => {
  const classes = ['oi-form']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-form--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-form--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle form submit
 */
const handleSubmit = (event: Event) => {
  emit('submit', event)
}

/**
 * Handle form reset
 */
const handleReset = (event: Event) => {
  emit('reset', event)
}

/**
 * Handle form invalid
 */
const handleInvalid = (event: Event) => {
  emit('invalid', event)
}
</script>

<template>
  <form
    :class="formClasses"
    :method="method"
    :action="action"
    :enctype="enctype"
    :novalidate="novalidate"
    :autocomplete="autocomplete"
    @submit="handleSubmit"
    @reset="handleReset"
    @invalid="handleInvalid"
  >
    <slot />
  </form>
</template>


