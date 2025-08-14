<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { computed } from 'vue'

export interface DialogProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Open state
   */
  open?: boolean
  
  /**
   * Close on backdrop click
   */
  closeOnBackdropClick?: boolean
  
  /**
   * Close on escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Modal behavior (prevents interaction with content behind)
   */
  modal?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'centered' | 'fullscreen'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<DialogProps>(), {
  themeClasses: '',
  open: false,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  modal: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
  close: []
}>()

/**
 * Generate dialog classes for theme system
 */
const dialogClasses = computed(() => {
  const classes = ['oi-dialog']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-dialog--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-dialog--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle open state change
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('update:open', details.open)
  emit('open-change', details)
  
  if (!details.open) {
    emit('close')
  }
}
</script>

<template>
  <Dialog.Root
    :open="open"
    :close-on-backdrop-click="closeOnBackdropClick"
    :close-on-escape="closeOnEscape"
    :modal="modal"
    @open-change="handleOpenChange"
  >
    <Dialog.Trigger v-if="$slots.trigger" class="oi-dialog-trigger">
      <slot name="trigger" />
    </Dialog.Trigger>
    
    <Teleport to="body">
      <Dialog.Backdrop class="oi-dialog-backdrop" />
      
      <Dialog.Positioner class="oi-dialog-positioner">
        <Dialog.Content :class="dialogClasses">
          <Dialog.Title v-if="$slots.title" class="oi-dialog-title">
            <slot name="title" />
          </Dialog.Title>
          
          <Dialog.Description v-if="$slots.description" class="oi-dialog-description">
            <slot name="description" />
          </Dialog.Description>
          
          <div v-if="$slots.default" class="oi-dialog-body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="oi-dialog-footer">
            <slot name="footer" />
          </div>
          
          <Dialog.CloseTrigger v-if="$slots.closeTrigger" class="oi-dialog-close">
            <slot name="closeTrigger" />
          </Dialog.CloseTrigger>
          
          <Dialog.CloseTrigger v-else class="oi-dialog-close">
            <slot name="closeIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-dialog-close-icon">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </slot>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>


