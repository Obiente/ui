<script setup lang="ts">
import { Tabs } from '@ark-ui/vue/tabs'
import { computed } from 'vue'

export interface TabsTriggerProps {
  /**
   * Value for this tab trigger
   */
  value: string
  
  /**
   * Whether this tab is disabled
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

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
  themeClasses: '',
  customClasses: ''
})

/**
 * Generate tab trigger classes for theme system
 */
const triggerClasses = computed(() => {
  const classes = ['oi-tabs-trigger']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  }
  
  if (props.disabled) classes.push('oi-tabs-trigger--disabled')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Tabs.Trigger
    :class="triggerClasses"
    :value="value"
    :disabled="disabled"
  >
    <slot />
  </Tabs.Trigger>
</template>


