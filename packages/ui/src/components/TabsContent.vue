<script setup lang="ts">
import { Tabs } from '@ark-ui/vue/tabs'
import { computed } from 'vue'

export interface TabsContentProps {
  /**
   * Value for this tab content panel
   */
  value: string
  
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TabsContentProps>(), {
  themeClasses: '',
  customClasses: ''
})

/**
 * Generate tab content classes for theme system
 */
const contentClasses = computed(() => {
  const classes = ['oi-tabs-content']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Tabs.Content
    :class="contentClasses"
    :value="value"
  >
    <slot />
  </Tabs.Content>
</template>


