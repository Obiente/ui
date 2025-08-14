<script setup lang="ts">
import { computed } from 'vue'

export interface PortalProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Target element to teleport to (CSS selector or HTMLElement)
   */
  to?: string | HTMLElement
  
  /**
   * Whether the portal is disabled
   */
  disabled?: boolean
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<PortalProps>(), {
  themeClasses: '',
  to: 'body',
  disabled: false,
  customClasses: ''
})

/**
 * Generate portal classes for theme system
 */
const portalClasses = computed(() => {
  const classes = ['oi-portal']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push('oi-portal--default')
  }
  
  if (props.disabled) {
    classes.push('oi-portal--disabled')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Teleport
    :to="to"
    :disabled="disabled"
  >
    <div :class="portalClasses">
      <slot />
    </div>
  </Teleport>
</template>


