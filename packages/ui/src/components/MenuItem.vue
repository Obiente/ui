<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { computed } from 'vue'

export interface MenuItemProps {
  /**
   * Value for this menu item
   */
  value: string
  
  /**
   * Whether this menu item is disabled
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

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
  themeClasses: '',
  customClasses: ''
})

/**
 * Generate menu item classes for theme system
 */
const itemClasses = computed(() => {
  const classes = ['oi-menu-item']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  }
  
  if (props.disabled) classes.push('oi-menu-item--disabled')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Menu.Item
    :class="itemClasses"
    :value="value"
    :disabled="disabled"
  >
    <slot />
  </Menu.Item>
</template>


