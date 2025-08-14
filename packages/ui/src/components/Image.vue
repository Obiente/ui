<script setup lang="ts">
import { computed, ref } from 'vue'

export interface ImageProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Image source URL
   */
  src?: string
  
  /**
   * Alt text for accessibility
   */
  alt?: string
  
  /**
   * Fallback image source
   */
  fallbackSrc?: string
  
  /**
   * Image width
   */
  width?: string | number
  
  /**
   * Image height
   */
  height?: string | number
  
  /**
   * Object fit behavior
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  
  /**
   * Loading behavior
   */
  loading?: 'eager' | 'lazy'
  
  /**
   * Show loading state
   */
  showLoading?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'rounded' | 'circle' | 'bordered'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  themeClasses: '',
  src: '',
  alt: '',
  fallbackSrc: '',
  width: undefined,
  height: undefined,
  objectFit: 'cover',
  loading: 'lazy',
  showLoading: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  'loading-start': []
  'loading-end': []
}>()

const isLoading = ref(true)
const hasError = ref(false)
const currentSrc = ref(props.src)

/**
 * Generate image classes for theme system
 */
const imageClasses = computed(() => {
  const classes = ['oi-image']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-image--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-image--${props.size}`)
  
  // Add object fit class
  classes.push(`oi-image--${props.objectFit}`)
  
  if (isLoading.value && props.showLoading) {
    classes.push('oi-image--loading')
  }
  
  if (hasError.value) {
    classes.push('oi-image--error')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Generate image styles
 */
const imageStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  if (props.objectFit) {
    styles.objectFit = props.objectFit
  }
  
  return styles
})

/**
 * Handle image load
 */
const handleLoad = (event: Event) => {
  isLoading.value = false
  hasError.value = false
  emit('load', event)
  emit('loading-end')
}

/**
 * Handle image error
 */
const handleError = (event: Event) => {
  isLoading.value = false
  hasError.value = true
  
  // Try fallback if available
  if (props.fallbackSrc && currentSrc.value !== props.fallbackSrc) {
    currentSrc.value = props.fallbackSrc
    hasError.value = false
    isLoading.value = true
    return
  }
  
  emit('error', event)
  emit('loading-end')
}

/**
 * Handle loading start
 */
const handleLoadStart = () => {
  isLoading.value = true
  hasError.value = false
  emit('loading-start')
}

// Reset state when src changes
const resetState = () => {
  isLoading.value = true
  hasError.value = false
  currentSrc.value = props.src
}

// Watch for src changes
import { watch } from 'vue'
watch(() => props.src, resetState)
</script>

<template>
  <div :class="imageClasses">
    <img
      v-if="!hasError"
      :src="currentSrc"
      :alt="alt"
      :loading="loading"
      :style="imageStyles"
      class="oi-image-element"
      @load="handleLoad"
      @error="handleError"
      @loadstart="handleLoadStart"
    />
    
    <div v-if="isLoading && showLoading" class="oi-image-loading">
      <slot name="loading">
        <div class="oi-image-loading-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-image-loading-icon">
            <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      </slot>
    </div>
    
    <div v-if="hasError" class="oi-image-error">
      <slot name="error">
        <div class="oi-image-error-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-image-error-icon">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            <line x1="15" y1="9" x2="21" y2="15" />
          </svg>
          <span class="oi-image-error-text">Failed to load image</span>
        </div>
      </slot>
    </div>
  </div>
</template>


