<script setup lang="ts">
import { ColorPicker, type ColorPickerRootProps } from '@ark-ui/vue/color-picker'
import { computed } from 'vue'

export interface ColorPickerProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current color value
   */
  value?: string
  
  /**
   * Color format
   */
  format?: ColorPickerRootProps['format']
  
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
  variant?: 'default' | 'bordered'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  themeClasses: '',
  value: '#000000',
  format: 'hex' as const,
  disabled: false,
  readOnly: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'value-change': [details: { value: string }]
  'format-change': [details: { format: string }]
  'open-change': [details: { open: boolean }]
}>()

/**
 * Generate color picker classes for theme system
 */
const colorPickerClasses = computed(() => {
  const classes = ['oi-color-picker']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-color-picker--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-color-picker--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-color-picker--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-color-picker--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}

/**
 * Handle format change
 */
const handleFormatChange = (details: { format: string }) => {
  emit('format-change', details)
}

/**
 * Handle open change
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('open-change', details)
}
</script>

<template>
  <ColorPicker.Root
    :class="colorPickerClasses"
    :value="value"
    :format="format"
    :disabled="disabled"
    :read-only="readOnly"
    @value-change="handleValueChange"
    @format-change="handleFormatChange"
    @open-change="handleOpenChange"
  >
    <ColorPicker.Label v-if="$slots.label" class="oi-color-picker-label">
      <slot name="label" />
    </ColorPicker.Label>
    
    <ColorPicker.Control class="oi-color-picker-control">
      <ColorPicker.ChannelInput channel="hex" class="oi-color-picker-input" />
      <ColorPicker.Trigger class="oi-color-picker-trigger">
        <ColorPicker.Swatch class="oi-color-picker-swatch" />
      </ColorPicker.Trigger>
    </ColorPicker.Control>
    
    <ColorPicker.Positioner>
      <ColorPicker.Content class="oi-color-picker-content">
        <ColorPicker.Area class="oi-color-picker-area">
          <ColorPicker.AreaBackground class="oi-color-picker-area-background" />
          <ColorPicker.AreaThumb class="oi-color-picker-area-thumb" />
        </ColorPicker.Area>
        
        <ColorPicker.ChannelSlider channel="hue" class="oi-color-picker-hue-slider">
          <ColorPicker.ChannelSliderTrack class="oi-color-picker-slider-track" />
          <ColorPicker.ChannelSliderThumb class="oi-color-picker-slider-thumb" />
        </ColorPicker.ChannelSlider>
        
        <ColorPicker.ChannelSlider channel="alpha" class="oi-color-picker-alpha-slider">
          <ColorPicker.ChannelSliderTrack class="oi-color-picker-slider-track" />
          <ColorPicker.ChannelSliderThumb class="oi-color-picker-slider-thumb" />
        </ColorPicker.ChannelSlider>
        
        <div class="oi-color-picker-inputs">
          <ColorPicker.ChannelInput channel="red" class="oi-color-picker-channel-input" />
          <ColorPicker.ChannelInput channel="green" class="oi-color-picker-channel-input" />
          <ColorPicker.ChannelInput channel="blue" class="oi-color-picker-channel-input" />
          <ColorPicker.ChannelInput channel="alpha" class="oi-color-picker-channel-input" />
        </div>
        
        <div v-if="$slots.swatches" class="oi-color-picker-swatches">
          <slot name="swatches" />
        </div>
        
        <ColorPicker.EyeDropperTrigger v-if="$slots.eyeDropper" class="oi-color-picker-eyedropper">
          <slot name="eyeDropper" />
        </ColorPicker.EyeDropperTrigger>
        
        <div v-if="$slots.actions" class="oi-color-picker-actions">
          <slot name="actions" />
        </div>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
  </ColorPicker.Root>
</template>


