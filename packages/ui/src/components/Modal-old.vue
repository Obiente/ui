<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { computed } from 'vue'

export interface ModalProps {
  /**
   * Controls the visibility of the modal (v-model)
   */
  open?: boolean/**
   * Modal title when using default header slot
   */
  title?: string
  
  /**
   * Whether to show the close button in the header
   */
  closeButton?: boolean
  
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnInteractOutside?: boolean
  
  /**
   * Whether to close the modal when pressing escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Modal size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  
  /**
   * Modal variant (semantic for theme system)
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Whether to enable lazy mounting
   */
  lazyMount?: boolean
  
  /**
   * Whether to unmount on exit
   */
  unmountOnExit?: boolean
  
  /**
   * Additional CSS classes
   */
  customClasses?: string

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  title: '',
  closeButton: true,
  closeOnInteractOutside: true,
  closeOnEscape: true,
  size: 'md',
  variant: 'primary',
  lazyMount: false,
  unmountOnExit: false,
  customClasses: ''

})const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
  close: []
  open: []
}>()

/**
 * Handle open/close state changes
 */
const handleOpenChange = (details: any) => {
  emit('update:open', details.open)
  emit('open-change', details)
  if (details.open) {
    emit('open')
  } else {
    emit('close')


/**
 * Generate backdrop classes for theme system
 */
const backdropClasses = computed(() => {
  const classes = ['oi-modal-backdrop']
  
  
    classes.push('oi-modal-backdrop--')

  return classes
}`)
/**
 * Generate content classes for theme system
 */
const contentClasses = computed(() => {
  const classes = ['oi-modal-content']
  
  `

    classes.push('oi-modal-content--')

  // Add size class for theme system to handle

  classes.push('oi-modal-content--')
  if (props.customClasses) {
    classes.push(props.customClasses)

</script>

<template>
  <Dialog.Root
    :open="open"
    :close-on-interact-outside="closeOnInteractOutside"
    :close-on-escape="closeOnEscape"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @open-change="handleOpenChange"
  >
    <!-- Trigger slot for external trigger -->
    <Dialog.Trigger v-if="$slots.trigger">
      <slot name="trigger" />
    </Dialog.Trigger>

    <!-- Using Teleport instead of Portal since Portal is not available -->
    <Teleport to="body">
      <Dialog.Backdrop :class="backdropClasses" />
      <Dialog.Positioner class="oi-modal-positioner">
        <Dialog.Content :class="contentClasses">
          
          <!-- Header -->
          <header v-if="title || closeButton || $slots.header" class="oi-modal-header">
            <slot name="header">
              <Dialog.Title v-if="title" class="oi-modal-title">{{ title }}</Dialog.Title>
              <Dialog.CloseTrigger v-if="closeButton" class="oi-modal-close">
                <slot name="close-icon">
                  <!-- Default close icon - can be overridden by theme -->
                  <span class="oi-modal-close-icon">×</span>
                </slot>
              </Dialog.CloseTrigger>
            </slot>
          </header>
          
          <!-- Body -->
          <main class="oi-modal-body">
            <Dialog.Description v-if="$slots.description" class="oi-modal-description">
              <slot name="description" />
            </Dialog.Description>
            <slot />
          </main>
          
          <!-- Footer -->
          <footer v-if="$slots.footer" class="oi-modal-footer">
            <slot name="footer" />
          </footer>
          
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>



export interface ModalProps {
  /**
   * Controls the visibility of the modal (v-model)
   */
  open?: boolean/**
   * Modal title when using default header slot
   */
  title?: string
  
  /**
   * Whether to show the close button in the header
   */
  closeButton?: boolean
  
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnInteractOutside?: boolean
  
  /**
   * Whether to close the modal when pressing escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Modal size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  
  /**
   * Modal variant (semantic for theme system)
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Whether to enable lazy mounting
   */
  lazyMount?: boolean
  
  /**
   * Whether to unmount on exit
   */
  unmountOnExit?: boolean
  
  /**
   * Additional CSS classes
   */
  customClasses?: string

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  title: '',
  closeButton: true,
  closeOnInteractOutside: true,
  closeOnEscape: true,
  size: 'md',
  variant: 'primary',
  lazyMount: false,
  unmountOnExit: false,
  customClasses: ''

})const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
  close: []
  open: []
}>()

/**
 * Handle open/close state changes
 */
const handleOpenChange = (details: any) => {
  emit('update:open', details.open)
  emit('open-change', details)
  if (details.open) {
    emit('open')
  } else {
    emit('close')


/**
 * Generate backdrop classes for theme system
 */
const backdropClasses = computed(() => {
  const classes = ['oi-modal-backdrop']
  
  
    classes.push('oi-modal-backdrop--')

  return classes
}`)
/**
 * Generate content classes for theme system
 */
const contentClasses = computed(() => {
  const classes = ['oi-modal-content']
  
  `

    classes.push('oi-modal-content--')

  // Add size class for theme system to handle

  classes.push('oi-modal-content--')
  if (props.customClasses) {
    classes.push(props.customClasses)

</script>

<template>
  <Dialog.Root
    :open="open"
    :close-on-interact-outside="closeOnInteractOutside"
    :close-on-escape="closeOnEscape"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @open-change="handleOpenChange"
  >
    <!-- Trigger slot for external trigger -->
    <Dialog.Trigger v-if="$slots.trigger">
      <slot name="trigger" />
    </Dialog.Trigger>

    <Portal>
      <Dialog.Backdrop :class="backdropClasses" />
      <Dialog.Positioner class="oi-modal-positioner">
        <Dialog.Content :class="contentClasses">
          
          <!-- Header -->
          <header v-if="title || closeButton || $slots.header" class="oi-modal-header">
            <slot name="header">
              <Dialog.Title v-if="title" class="oi-modal-title">{{ title }}</Dialog.Title>
              <Dialog.CloseTrigger v-if="closeButton" class="oi-modal-close">
                <slot name="close-icon">
                  <!-- Default close icon - can be overridden by theme -->
                  <span class="oi-modal-close-icon">×</span>
                </slot>
              </Dialog.CloseTrigger>
            </slot>
          </header>
          
          <!-- Body -->
          <main class="oi-modal-body">
            <Dialog.Description v-if="$slots.description" class="oi-modal-description">
              <slot name="description" />
            </Dialog.Description>
            <slot />
          </main>
          
          <!-- Footer -->
          <footer v-if="$slots.footer" class="oi-modal-footer">
            <slot name="footer" />
          </footer>
          
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
</template>


