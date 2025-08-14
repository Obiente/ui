<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import { computed } from 'vue'

export interface TooltipProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Whether the tooltip is open
   */
  open?: boolean
  
  /**
   * Default open state for uncontrolled tooltip
   */
  defaultOpen?: boolean
  
  /**
   * Tooltip positioning
   */
  positioning?: {
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
    offset?: { mainAxis?: number; crossAxis?: number }
    gutter?: number
  }
  
  /**
   * Open delay in milliseconds
   */
  openDelay?: number
  
  /**
   * Close delay in milliseconds
   */
  closeDelay?: number
  
  /**
   * Tooltip variant (semantic for theme system)
   */
  variant?: 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success'
  
  /**
   * Tooltip size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TooltipProps>(), {
  themeClasses: '',
  open: undefined,
  defaultOpen: false,
  positioning: () => ({ placement: 'top' }),
  openDelay: 1000,
  closeDelay: 500,
  variant: 'default',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
}>()

/**
 * Generate tooltip classes for theme system
 */
const tooltipClasses = computed(() => {
  const classes = ['oi-tooltip']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-tooltip--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-tooltip--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle open/close state changes
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('update:open', details.open)
  emit('open-change', details)
}
</script>

<template>
  <Tooltip.Root
    :open="open"
    :default-open="defaultOpen"
    :positioning="positioning"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    @open-change="handleOpenChange"
  >
    <Tooltip.Trigger class="oi-tooltip-trigger">
      <slot name="trigger" />
    </Tooltip.Trigger>
    
    <Teleport to="body">
      <Tooltip.Positioner class="oi-tooltip-positioner">
        <Tooltip.Content :class="tooltipClasses">
          <Tooltip.Arrow class="oi-tooltip-arrow">
            <Tooltip.ArrowTip class="oi-tooltip-arrow-tip" />
          </Tooltip.Arrow>
          
          <slot />
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>


