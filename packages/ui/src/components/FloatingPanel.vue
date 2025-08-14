<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

export interface FloatingPanelProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Open state
   */
  open?: boolean
  
  /**
   * Initial position
   */
  initialPosition?: { x: number; y: number }
  
  /**
   * Initial size
   */
  initialSize?: { width: number; height: number }
  
  /**
   * Enable dragging
   */
  draggable?: boolean
  
  /**
   * Enable resizing
   */
  resizable?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'elevated' | 'floating'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<FloatingPanelProps>(), {
  themeClasses: '',
  open: false,
  initialPosition: () => ({ x: 100, y: 100 }),
  initialSize: () => ({ width: 300, height: 200 }),
  draggable: true,
  resizable: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [details: { open: boolean }]
  'position-change': [details: { position: { x: number; y: number } }]
  'size-change': [details: { size: { width: number; height: number } }]
}>()

const panelRef = ref<HTMLElement>()
const position = ref(props.initialPosition)
const size = ref(props.initialSize)
const isDragging = ref(false)
const isResizing = ref(false)

/**
 * Generate floating panel classes for theme system
 */
const floatingPanelClasses = computed(() => {
  const classes = ['oi-floating-panel']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-floating-panel--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-floating-panel--${props.size}`)
  
  if (props.resizable) {
    classes.push('oi-floating-panel--resizable')
  }
  
  if (props.draggable) {
    classes.push('oi-floating-panel--draggable')
  }
  
  if (props.open) {
    classes.push('oi-floating-panel--open')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Panel styles for positioning and sizing
 */
const panelStyles = computed(() => ({
  position: 'fixed' as const,
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
  width: `${size.value.width}px`,
  height: `${size.value.height}px`,
  zIndex: 1000
}))

/**
 * Close panel
 */
const closePanel = () => {
  emit('update:open', false)
  emit('open-change', { open: false })
}

/**
 * Handle drag start
 */
const handleDragStart = (event: MouseEvent) => {
  if (!props.draggable) return
  
  isDragging.value = true
  const startX = event.clientX - position.value.x
  const startY = event.clientY - position.value.y
  
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    
    const newPosition = {
      x: e.clientX - startX,
      y: e.clientY - startY
    }
    
    position.value = newPosition
    emit('position-change', { position: newPosition })
  }
  
  const handleDragEnd = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
  }
  
  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
}

/**
 * Handle resize start
 */
const handleResizeStart = (event: MouseEvent) => {
  if (!props.resizable) return
  
  event.stopPropagation()
  isResizing.value = true
  
  const startX = event.clientX
  const startY = event.clientY
  const startWidth = size.value.width
  const startHeight = size.value.height
  
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing.value) return
    
    const newSize = {
      width: Math.max(200, startWidth + (e.clientX - startX)),
      height: Math.max(150, startHeight + (e.clientY - startY))
    }
    
    size.value = newSize
    emit('size-change', { size: newSize })
  }
  
  const handleResizeEnd = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
  }
  
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)
}

// Handle escape key to close
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.open) {
      closePanel()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="panelRef"
      :class="floatingPanelClasses"
      :style="panelStyles"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="oi-floating-panel-header"
        @mousedown="handleDragStart"
      >
        <div v-if="$slots.title" class="oi-floating-panel-title">
          <slot name="title" />
        </div>
        
        <button 
          type="button"
          class="oi-floating-panel-close" 
          @click="closePanel"
          aria-label="Close panel"
        >
          <slot name="closeIcon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-floating-panel-close-icon">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </slot>
        </button>
      </div>
      
      <div class="oi-floating-panel-body">
        <slot />
      </div>
      
      <div 
        v-if="resizable"
        class="oi-floating-panel-resize-trigger"
        @mousedown="handleResizeStart"
        aria-label="Resize panel"
      >
        <slot name="resizeHandle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-floating-panel-resize-icon">
            <path d="M21 12h-8" />
            <path d="M15 8l4 4-4 4" />
            <path d="M3 12h8" />
            <path d="M9 8l-4 4 4 4" />
          </svg>
        </slot>
      </div>
    </div>
  </Teleport>
  
  <!-- Trigger slot for external trigger -->
  <slot name="trigger" :open="() => emit('update:open', true)" />
</template>


