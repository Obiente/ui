<script setup lang="ts">
import { Frame } from '@ark-ui/vue/frame'
import { computed } from 'vue'

export interface FrameProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Frame source document
   */
  doc?: Document
  
  /**
   * Frame title
   */
  title?: string
  
  /**
   * Frame width
   */
  width?: string | number
  
  /**
   * Frame height
   */
  height?: string | number
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'full'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'elevated'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<FrameProps>(), {
  themeClasses: '',
  doc: undefined,
  title: 'Frame',
  width: '100%',
  height: '400px',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

/**
 * Generate frame classes for theme system
 */
const frameClasses = computed(() => {
  const classes = ['oi-frame']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-frame--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-frame--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle load event
 */
const handleLoad = (event: Event) => {
  emit('load', event)
}

/**
 * Handle error event
 */
const handleError = (event: Event) => {
  emit('error', event)
}
</script>

<template>
  <Frame.Root
    :class="frameClasses"
    :doc="doc"
    @load="handleLoad"
    @error="handleError"
  >
    <Frame.Element
      :title="title"
      :width="width"
      :height="height"
      class="oi-frame-element"
    >
      <slot />
    </Frame.Element>
  </Frame.Root>
</template>


