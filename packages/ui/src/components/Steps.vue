<script setup lang="ts">
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsTrigger,
  StepsIndicator,
  StepsSeparator,
  StepsContent,
  StepsPrevTrigger,
  StepsNextTrigger
} from '@ark-ui/vue/steps'
import { computed } from 'vue'

export interface StepItem {
  value: string
  title: string
  description?: string
  disabled?: boolean
}

export interface StepsProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current step value
   */
  value?: string
  
  /**
   * Step items
   */
  steps?: StepItem[]
  
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Linear progression (require completing previous steps)
   */
  linear?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'outlined' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<StepsProps>(), {
  themeClasses: '',
  value: '',
  steps: () => [],
  orientation: 'horizontal',
  linear: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'value-change': [details: { value: string }]
  'step-complete': [details: { value: string }]
}>()

/**
 * Generate steps classes for theme system
 */
const stepsClasses = computed(() => {
  const classes = ['oi-steps']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-steps--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-steps--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-steps--${props.orientation}`)
  
  if (props.linear) {
    classes.push('oi-steps--linear')
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
 * Handle step complete
 */
const handleStepComplete = (details: { value: string }) => {
  emit('step-complete', details)
}
</script>

<template>
  <StepsRoot
    :class="stepsClasses"
    :value="value"
    :step="currentStep"
    @value-change="handleValueChange"
    @step-complete="handleStepComplete"
  >
    <StepsList class="oi-steps-list">
      <StepsItem
        v-for="(step, index) in steps"
        :key="step.value"
        :value="step.value"
        class="oi-steps-item"
        :disabled="step.disabled"
      >
        <StepsTrigger class="oi-steps-trigger">
          <StepsIndicator class="oi-steps-indicator">
            <slot name="indicator" :step="step" :index="index">
              {{ index + 1 }}
            </slot>
          </StepsIndicator>
          
          <StepsSeparator v-if="index < steps.length - 1" class="oi-steps-separator" />
        </StepsTrigger>
        
        <StepsContent class="oi-steps-content">
          <div class="oi-steps-title">
            {{ step.title }}
          </div>
          
          <div v-if="step.description" class="oi-steps-description">
            {{ step.description }}
          </div>
        </StepsContent>
      </StepsItem>
    </StepsList>
    
    <!-- Navigation buttons -->
    <div v-if="showNavigation" class="oi-steps-navigation">
      <!-- Content for current step -->
      <div class="oi-steps-current-content">
        <slot name="content" :step="currentStepData" :index="currentStepIndex" />
      </div>
      
      <div class="oi-steps-controls">
        <StepsPrevTrigger class="oi-steps-prev-trigger">
          <slot name="prevButton">Previous</slot>
        </StepsPrevTrigger>
        
        <StepsNextTrigger class="oi-steps-next-trigger">
          <slot name="nextButton">Next</slot>
        </StepsNextTrigger>
      </div>
    </div>
    
    <!-- Default slot for custom content -->
    <slot />
  </StepsRoot>
</template>


