<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import { computed } from 'vue'

export interface SliderProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current value(s) of the slider
   */
  modelValue?: number[]
  
  /**
   * Default value(s) for uncontrolled slider
   */
  defaultValue?: number[]
  
  /**
   * Minimum value
   */
  min?: number
  
  /**
   * Maximum value
   */
  max?: number
  
  /**
   * Step increment
   */
  step?: number
  
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  
  /**
   * Slider orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Slider variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outline'
  
  /**
   * Slider size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SliderProps>(), {
  themeClasses: '',
  modelValue: () => [0],
  defaultValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: 'horizontal',
  variant: 'default',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
  'value-change': [details: { value: number[] }]
}>()

/**
 * Generate slider classes for theme system
 */
const sliderClasses = computed(() => {
  const classes = ['oi-slider']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-slider--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-slider--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-slider--${props.orientation}`)
  
  // Add state classes
  if (props.disabled) classes.push('oi-slider--disabled')
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value changes
 */
const handleValueChange = (details: { value: number[] }) => {
  emit('update:modelValue', details.value)
  emit('value-change', details)
}
</script>

<template>
  <Slider.Root
    :class="sliderClasses"
    :value="modelValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :orientation="orientation"
    @value-change="handleValueChange"
  >
    <Slider.Label v-if="$slots.label" class="oi-slider-label">
      <slot name="label" />
    </Slider.Label>
    
    <Slider.ValueText v-if="$slots.valueText" class="oi-slider-value">
      <slot name="valueText" :value="modelValue" />
    </Slider.ValueText>
    
    <Slider.Control class="oi-slider-control">
      <Slider.Track class="oi-slider-track">
        <Slider.Range class="oi-slider-range" />
      </Slider.Track>
      
      <Slider.Thumb
        v-for="(_, index) in modelValue"
        :key="index"
        :index="index"
        class="oi-slider-thumb"
      >
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
  </Slider.Root>
</template>


