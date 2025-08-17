<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
import { computed } from 'vue'

export interface QrCodeProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Data to encode in QR code
   */
  value?: string
  
  /**
   * Error correction level
   */
  errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high'
  
  /**
   * QR code encoding
   */
  encoding?: 'utf8' | 'iso-8859-1'
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'rounded'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<QrCodeProps>(), {
  themeClasses: '',
  value: '',
  errorCorrectionLevel: 'medium',
  encoding: 'utf8',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate QR code classes for theme system
 */
const qrCodeClasses = computed(() => {
  const classes = ['oi-qr-code']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-qr-code--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-qr-code--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <QrCode.Root
    :class="qrCodeClasses"
    :value="value"
    :error-correction-level="errorCorrectionLevel"
  >
    <QrCode.Frame class="oi-qr-code-frame">
      <QrCode.Pattern class="oi-qr-code-pattern" />
    </QrCode.Frame>
    
    <QrCode.Overlay v-if="$slots.overlay" class="oi-qr-code-overlay">
      <slot name="overlay" />
    </QrCode.Overlay>
  </QrCode.Root>
</template>


