<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { computed } from 'vue'

export interface PopoverProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Whether the popover is open
   */
  open?: boolean
  
  /**
   * Default open state for uncontrolled popover
   */
  defaultOpen?: boolean
  
  /**
   * Whether to close on interact outside
   */
  closeOnInteractOutside?: boolean
  
  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Popover positioning
   */
  positioning?: {
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
    offset?: { mainAxis?: number; crossAxis?: number }
    gutter?: number
  }
  
  /**
   * Whether to enable lazy mounting
   */
  lazyMount?: boolean
  
  /**
   * Whether to unmount on exit
   */
  unmountOnExit?: boolean
  
  /**
   * Popover variant (semantic for theme system)
   */
  variant?: 'default' | 'tooltip' | 'menu'
  
  /**
   * Popover size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<PopoverProps>(), {
  themeClasses: '',
  open: undefined,
  defaultOpen: false,
  closeOnInteractOutside: true,
  closeOnEscape: true,
  positioning: () => ({ placement: 'bottom' }),
  lazyMount: false,
  unmountOnExit: false,
  variant: 'default',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
}>()

/**
 * Generate popover classes for theme system
 */
const popoverClasses = computed(() => {
  const classes = ['oi-popover']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-popover--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-popover--${props.size}`)
  
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
  <Popover.Root
    :open="open"
    :default-open="defaultOpen"
    :close-on-interact-outside="closeOnInteractOutside"
    :close-on-escape="closeOnEscape"
    :positioning="positioning"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @open-change="handleOpenChange"
  >
    <Popover.Trigger class="oi-popover-trigger">
      <slot name="trigger" />
    </Popover.Trigger>
    
    <Teleport to="body">
      <Popover.Positioner class="oi-popover-positioner">
        <Popover.Content :class="popoverClasses">
          <Popover.Arrow v-if="$slots.arrow" class="oi-popover-arrow">
            <Popover.ArrowTip class="oi-popover-arrow-tip" />
          </Popover.Arrow>
          
          <header v-if="$slots.header" class="oi-popover-header">
            <slot name="header" />
          </header>
          
          <main class="oi-popover-body">
            <slot />
          </main>
          
          <footer v-if="$slots.footer" class="oi-popover-footer">
            <slot name="footer" />
          </footer>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>


