<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { computed } from 'vue'

export interface MenuProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Whether the menu is open
   */
  open?: boolean
  
  /**
   * Default open state for uncontrolled menu
   */
  defaultOpen?: boolean
  
  /**
   * Whether to close on select
   */
  closeOnSelect?: boolean
  
  /**
   * Whether to close on interact outside
   */
  closeOnInteractOutside?: boolean
  
  /**
   * Menu positioning
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
   * Menu variant (semantic for theme system)
   */
  variant?: 'default' | 'context' | 'dropdown'
  
  /**
   * Menu size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<MenuProps>(), {
  themeClasses: '',
  open: undefined,
  defaultOpen: false,
  closeOnSelect: true,
  closeOnInteractOutside: true,
  positioning: () => ({ placement: 'bottom-start' }),
  lazyMount: false,
  unmountOnExit: false,
  variant: 'default',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
  select: [details: { value: string }]
}>()

/**
 * Generate menu classes for theme system
 */
const menuClasses = computed(() => {
  const classes = ['oi-menu']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-menu--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-menu--${props.size}`)
  
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

/**
 * Handle menu item selection
 */
const handleSelect = (details: { value: string }) => {
  emit('select', details)
}
</script>

<template>
  <Menu.Root
    :open="open"
    :default-open="defaultOpen"
    :close-on-select="closeOnSelect"
    :close-on-interact-outside="closeOnInteractOutside"
    :positioning="positioning"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @open-change="handleOpenChange"
    @select="handleSelect"
  >
    <Menu.Trigger v-if="$slots.trigger" class="oi-menu-trigger">
      <slot name="trigger" />
    </Menu.Trigger>
    
    <Teleport to="body">
      <Menu.Positioner class="oi-menu-positioner">
        <Menu.Content :class="menuClasses">
          <slot />
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>


