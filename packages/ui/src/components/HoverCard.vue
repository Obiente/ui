<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
import { computed } from 'vue'

export interface HoverCardProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Open delay in milliseconds
   */
  openDelay?: number
  
  /**
   * Close delay in milliseconds
   */
  closeDelay?: number
  
  /**
   * Positioning strategy
   */
  positioning?: {
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
    offset?: { mainAxis?: number; crossAxis?: number }
    gutter?: number
  }
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'elevated'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<HoverCardProps>(), {
  themeClasses: '',
  openDelay: 700,
  closeDelay: 300,
  positioning: () => ({
    placement: 'bottom',
    gutter: 4
  }),
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'open-change': [details: { open: boolean }]
}>()

/**
 * Generate hovercard classes for theme system
 */
const hoverCardClasses = computed(() => {
  const classes = ['oi-hovercard']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-hovercard--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-hovercard--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle open change
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('open-change', details)
}
</script>

<template>
  <HoverCard.Root
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :positioning="positioning"
    @open-change="handleOpenChange"
  >
    <HoverCard.Trigger class="oi-hovercard-trigger">
      <slot name="trigger" />
    </HoverCard.Trigger>
    
    <HoverCard.Positioner>
      <HoverCard.Content :class="hoverCardClasses">
        <HoverCard.Arrow v-if="$slots.arrow" class="oi-hovercard-arrow">
          <HoverCard.ArrowTip class="oi-hovercard-arrow-tip" />
        </HoverCard.Arrow>
        
        <div v-if="$slots.header" class="oi-hovercard-header">
          <slot name="header" />
        </div>
        
        <div v-if="$slots.default" class="oi-hovercard-body">
          <slot />
        </div>
        
        <div v-if="$slots.footer" class="oi-hovercard-footer">
          <slot name="footer" />
        </div>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </HoverCard.Root>
</template>


