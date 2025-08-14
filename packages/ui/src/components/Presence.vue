<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence'
import { computed } from 'vue'

export interface PresenceProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Present state - whether element should be rendered
   */
  present?: boolean
  
  /**
   * Lazy mount - delay mounting until present
   */
  lazyMount?: boolean
  
  /**
   * Unmount on exit - remove from DOM when not present
   */
  unmountOnExit?: boolean
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<PresenceProps>(), {
  themeClasses: '',
  present: false,
  lazyMount: false,
  unmountOnExit: false,
  animationDuration: 200,
  customClasses: ''
})

const emit = defineEmits<{
  'exit-complete': []
}>()

/**
 * Generate presence classes for theme system
 */
const presenceClasses = computed(() => {
  const classes = ['oi-presence']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push('oi-presence--default')
  }
  
  if (props.present) {
    classes.push('oi-presence--present')
  } else {
    classes.push('oi-presence--absent')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle exit complete
 */
const handleExitComplete = () => {
  emit('exit-complete')
}
</script>

<template>
  <Presence.Root
    :present="present"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @exit-complete="handleExitComplete"
  >
    <div :class="presenceClasses">
      <slot />
    </div>
  </Presence.Root>
</template>


