<script setup lang="ts">
import { Toast } from '@ark-ui/vue/toast'
import { computed } from 'vue'

export interface ToastProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Toast ID
   */
  id?: string
  
  /**
   * Toast type (semantic for theme system)
   */
  type?: 'info' | 'success' | 'warning' | 'error'
  
  /**
   * Toast variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Position of the toast
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  
  /**
   * Duration in milliseconds (0 for persistent)
   */
  duration?: number
  
  /**
   * Whether toast can be dismissed
   */
  dismissible?: boolean
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<ToastProps>(), {
  themeClasses: '',
  id: undefined,
  type: 'info',
  variant: 'default',
  placement: 'top-end',
  duration: 5000,
  dismissible: true,
  customClasses: ''
})

const emit = defineEmits<{
  dismiss: [id: string]
  'open-change': [details: { open: boolean }]
}>()

const toastClasses = computed(() => {
  const classes = ['oi-toast']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-toast--${props.variant}`)
  }

  classes.push(`oi-toast--${props.type}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

const handleDismiss = () => {
  if (props.id) {
    emit('dismiss', props.id)
  }
}

const handleOpenChange = (details: { open: boolean }) => {
  emit('open-change', details)
}
</script>

<template>
  <Toast.Root
    :class="toastClasses"
    :type="type"
    :duration="duration"
    @open-change="handleOpenChange"
  >
    <Toast.Title v-if="$slots.title" class="oi-toast-title">
      <slot name="title" />
    </Toast.Title>
    
    <Toast.Description v-if="$slots.description" class="oi-toast-description">
      <slot name="description" />
    </Toast.Description>
    
    <div v-if="$slots.default" class="oi-toast-content">
      <slot />
    </div>
    
    <div v-if="$slots.action" class="oi-toast-action">
      <slot name="action" />
    </div>
    
    <Toast.CloseTrigger 
      v-if="dismissible"
      class="oi-toast-close"
      @click="handleDismiss"
    >
      <slot name="closeIcon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-toast-close-icon">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </slot>
    </Toast.CloseTrigger>
  </Toast.Root>
</template>


