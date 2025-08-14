<script setup lang="ts">
import { Tabs } from '@ark-ui/vue/tabs'
import { computed } from 'vue'

export interface TabsProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Default active tab value
   */
  defaultValue?: string
  
  /**
   * Controlled active tab value
   */
  value?: string
  
  /**
   * Tab orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Tabs variant (semantic for theme system)
   */
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled'
  
  /**
   * Tabs size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  themeClasses: '',
  defaultValue: '',
  value: undefined,
  orientation: 'horizontal',
  variant: 'line',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'value-change': [details: { value: string }]
}>()

/**
 * Generate tabs classes for theme system
 */
const tabsClasses = computed(() => {
  const classes = ['oi-tabs']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-tabs--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-tabs--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-tabs--${props.orientation}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value changes
 */
const handleValueChange = (details: { value: string }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}
</script>

<template>
  <Tabs.Root
    :class="tabsClasses"
    :default-value="defaultValue"
    :value="value"
    :orientation="orientation"
    @value-change="handleValueChange"
  >
    <Tabs.List class="oi-tabs-list">
      <slot name="list" />
    </Tabs.List>
    
    <slot />
  </Tabs.Root>
</template>


