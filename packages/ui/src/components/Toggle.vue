<script setup lang="ts">
import { computed } from 'vue'

export interface ToggleProps {
  /**
   * The pressed state of the toggle (v-model)
   */
  modelValue?: boolean
  
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean
  
  /**
   * Toggle size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Toggle variant (semantic for theme system)
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  themeClasses: '',
  disabled: false,
  size: 'md',
  variant: 'primary',
  type: 'button',
  customClasses: ''
})

const emit = defineEmits<{
  'update:modelValue': [pressed: boolean]
  change: [pressed: boolean]
  click: [event: MouseEvent]
}>()

/**
 * Generate toggle classes for theme system
 */
const toggleClasses = computed(() => {
  const classes = ['oi-toggle']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-toggle--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-toggle--${props.size}`)
  
  // Add state classes for theme system
  if (props.disabled) classes.push('oi-toggle--disabled')
  if (props.modelValue) classes.push('oi-toggle--pressed')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle toggle click
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    const newPressed = !props.modelValue
    emit('update:modelValue', newPressed)
    emit('change', newPressed)
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="toggleClasses"
    :type="type"
    :disabled="disabled"
    :aria-pressed="modelValue"
    @click="handleClick"
  >
    <span class="oi-toggle-content">
      <slot />
    </span>
  </button>
</template>


