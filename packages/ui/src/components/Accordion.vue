<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { computed } from 'vue'

export interface AccordionProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Whether multiple items can be open simultaneously
   */
  multiple?: boolean
  
  /**
   * Whether all items can be closed
   */
  collapsible?: boolean
  
  /**
   * Default open items (for uncontrolled accordion)
   */
  defaultValue?: string[]
  
  /**
   * Controlled open items
   */
  value?: string[]
  
  /**
   * Accordion variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'filled' | 'ghost'
  
  /**
   * Accordion size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<AccordionProps>(), {
  themeClasses: '',
  multiple: false,
  collapsible: true,
  defaultValue: () => [],
  value: undefined,
  variant: 'default',
  size: 'md',
  disabled: false,
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string[]]
  'value-change': [details: { value: string[] }]
}>()

/**
 * Generate accordion classes for theme system
 */
const accordionClasses = computed(() => {
  const classes = ['oi-accordion']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-accordion--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-accordion--${props.size}`)
  
  // Add state classes for theme system
  if (props.disabled) classes.push('oi-accordion--disabled')
  if (props.multiple) classes.push('oi-accordion--multiple')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value changes
 */
const handleValueChange = (details: { value: string[] }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}
</script>

<template>
  <div :class="['oi-bg-surface', 'oi-border', 'oi-rounded-md', 'oi-shadow-lg', 'oi-px-4', 'oi-py-2', $attrs.class]">
    <Accordion.Root
      :class="accordionClasses"
      :multiple="multiple"
      :collapsible="collapsible"
      :default-value="defaultValue"
      :value="value"
      :disabled="disabled"
      @value-change="handleValueChange"
    >
      <slot />
    </Accordion.Root>
  </div>
</template>


