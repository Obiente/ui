<script setup lang="ts">
import { Tour, useTour } from '@ark-ui/vue/tour'
import { computed } from 'vue'

export interface TourProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string

  /**
   * The unique identifier of the machine
   */
  id?: string

  /**
   * A list of steps to show in the tour
   */
  steps?: any[]

  /**
   * Whether the tour is open by default
   */
  defaultOpen?: boolean

  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outlined'

  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TourProps>(), {
  themeClasses: '',
  steps: () => [],
  defaultOpen: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  stepChange: [details: any]
  complete: []
}>()

// Create tour instance
const tour = useTour({
  id: props.id,
  steps: props.steps,
  defaultOpen: props.defaultOpen,
  onStepChange: (details) => emit('stepChange', details),
  onComplete: () => emit('complete')
})

/**
 * Generate tour classes for theme system
 */
const tourClasses = computed(() => {
  const classes = ['oi-tour']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-tour--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-tour--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes.join(' ')
})
</script>

<template>
  <Tour.Root :tour="tour" :class="tourClasses">
    <Tour.Backdrop />
    <Tour.Spotlight />
    
    <Tour.Positioner>
      <Tour.Content>
        <Tour.Arrow>
          <Tour.ArrowTip />
        </Tour.Arrow>
        
        <Tour.Title>
          <slot name="title" />
        </Tour.Title>
        
        <Tour.Description>
          <slot name="description" />
        </Tour.Description>
        
        <Tour.CloseTrigger>
          <slot name="closeButton">×</slot>
        </Tour.CloseTrigger>
        
        <div class="oi-tour-actions">
          <slot name="actions" />
        </div>
      </Tour.Content>
    </Tour.Positioner>
  </Tour.Root>
</template>


