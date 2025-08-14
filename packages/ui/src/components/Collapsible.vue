<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { computed } from 'vue'

export interface CollapsibleProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Open state
   */
  open?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'card'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CollapsibleProps>(), {
  themeClasses: '',
  open: false,
  disabled: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
}>()

/**
 * Generate collapsible classes for theme system
 */
const collapsibleClasses = computed(() => {
  const classes = ['oi-collapsible']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-collapsible--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-collapsible--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-collapsible--disabled')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle open change
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('update:open', details.open)
  emit('open-change', details)
}
</script>

<template>
  <Collapsible.Root
    :class="collapsibleClasses"
    :open="open"
    :disabled="disabled"
    @open-change="handleOpenChange"
  >
    <Collapsible.Trigger class="oi-collapsible-trigger">
      <slot name="trigger" />
      <div v-if="$slots.indicator" class="oi-collapsible-indicator">
        <slot name="indicator" />
      </div>
      <div v-else class="oi-collapsible-indicator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-collapsible-icon">
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </div>
    </Collapsible.Trigger>
    
    <Collapsible.Content class="oi-collapsible-content">
      <div class="oi-collapsible-body">
        <slot />
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
</template>


