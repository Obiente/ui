<script setup lang="ts">
import { SignaturePad } from '@ark-ui/vue/signature-pad'
import { computed } from 'vue'

export interface SignaturePadProps {
  /**
   * Current drawing paths
   */
  drawing?: string[][]
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SignaturePadProps>(), {
  drawing: () => [],
  disabled: false,
  readOnly: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:drawing': [drawing: string[][]]
  'drawing-change': [details: { paths: string[][] }]
  'drawing-start': []
  'drawing-end': []
}>()

/**
 * Generate signature pad classes for theme system
 */
const signaturePadClasses = computed(() => {
  const classes = ['oi-signature-pad']
  
  classes.push(`oi-signature-pad--${props.variant}`)
  
  // Add size class for theme system to handle
  classes.push(`oi-signature-pad--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-signature-pad--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-signature-pad--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle drawing change
 */
const handleDrawingChange = (details: { paths: string[][] }) => {
  emit('update:drawing', details.paths)
  emit('drawing-change', details)
}

/**
 * Handle drawing start
 */
const handleDrawingStart = () => {
  emit('drawing-start')
}

/**
 * Handle drawing end
 */
const handleDrawingEnd = () => {
  emit('drawing-end')
}
</script>

<template>
  <SignaturePad.Root
    :class="signaturePadClasses"
    :disabled="disabled"
    :read-only="readOnly"
    @drawing-change="handleDrawingChange"
    @drawing-start="handleDrawingStart"
    @drawing-end="handleDrawingEnd"
  >
    <SignaturePad.Label v-if="$slots.label" class="oi-signature-pad-label">
      <slot name="label" />
    </SignaturePad.Label>
    
    <SignaturePad.Control class="oi-signature-pad-control">
      <SignaturePad.Segment class="oi-signature-pad-segment" />
      <SignaturePad.Guide class="oi-signature-pad-guide" />
    </SignaturePad.Control>
    
    <SignaturePad.ClearTrigger v-if="$slots.clearTrigger" class="oi-signature-pad-clear">
      <slot name="clearTrigger" />
    </SignaturePad.ClearTrigger>
    
    <SignaturePad.ClearTrigger v-else class="oi-signature-pad-clear">
      <slot name="clearIcon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-signature-pad-clear-icon">
          <polyline points="3,6 5,6 21,6" />
          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
        </svg>
      </slot>
    </SignaturePad.ClearTrigger>
  </SignaturePad.Root>
</template>


