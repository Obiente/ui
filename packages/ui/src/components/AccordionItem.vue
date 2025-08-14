<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { computed } from 'vue'

export interface AccordionItemProps {
  /**
   * Unique value for this accordion item
   */
  value: string
  
  /**
   * Whether this item is disabled
   */
  disabled?: boolean
  
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
  themeClasses: '',
  customClasses: ''
})

/**
 * Generate accordion item classes for theme system
 */
const itemClasses = computed(() => {
  const classes = ['oi-accordion-item']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  }
  
  if (props.disabled) classes.push('oi-accordion-item--disabled')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Accordion.Item
    :class="itemClasses"
    :value="value"
    :disabled="disabled"
  >
    <Accordion.ItemTrigger class="oi-accordion-trigger">
      <slot name="trigger" />
      <Accordion.ItemIndicator class="oi-accordion-indicator">
        <slot name="indicator">
          <!-- Default indicator - theme can override -->
          <span class="oi-accordion-indicator-icon">▼</span>
        </slot>
      </Accordion.ItemIndicator>
    </Accordion.ItemTrigger>
    
    <Accordion.ItemContent class="oi-accordion-content">
      <slot />
    </Accordion.ItemContent>
  </Accordion.Item>
</template>


