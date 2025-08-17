<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
import { computed } from 'vue'

export interface SplitterPanel {
  id: string
  size?: number
  minSize?: number
  maxSize?: number
}

export interface SplitterProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Splitter orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Panel configuration
   */
  panels?: SplitterPanel[]
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
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

const props = withDefaults(defineProps<SplitterProps>(), {
  themeClasses: '',
  orientation: 'horizontal',
  panels: () => [
    { id: 'a', size: 50 },
    { id: 'b', size: 50 }
  ],
  disabled: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'size-change': [details: { size: number[] }]
  'size-change-end': [details: { size: number[] }]
}>()

/**
 * Generate splitter classes for theme system
 */
const splitterClasses = computed(() => {
  const classes = ['oi-splitter']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-splitter--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-splitter--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-splitter--${props.orientation}`)
  
  if (props.disabled) {
    classes.push('oi-splitter--disabled')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle size change
 */
const handleSizeChange = (details: { size: number[] }) => {
  emit('size-change', details)
}

/**
 * Handle size change end
 */
const handleSizeChangeEnd = (details: { size: number[] }) => {
  emit('size-change-end', details)
}
</script>

<template>
  <Splitter.Root
    :class="splitterClasses"
    :orientation="orientation"
    :size="panels.map(p => p.size || 100)"
    :panels="panels"
    :disabled="disabled"
    @size-change="handleSizeChange"
    @size-change-end="handleSizeChangeEnd"
  >
    <template v-for="(panel, index) in panels" :key="panel.id">
      <Splitter.Panel
        :id="panel.id"
        class="oi-splitter-panel"
      >
        <slot :name="`panel-${panel.id}`" :panel="panel" :index="index">
          <div class="oi-splitter-panel-content">
            <slot name="default" :panel="panel" :index="index" />
          </div>
        </slot>
      </Splitter.Panel>
      
      <Splitter.ResizeTrigger
        v-if="index < panels.length - 1"
        :id="`${panel.id}:${panels[index + 1].id}`"
        class="oi-splitter-resize-trigger"
      >
        <slot name="resizeHandle">
          <div class="oi-splitter-resize-handle">
            <svg
              v-if="orientation === 'horizontal'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="oi-splitter-resize-icon"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="15" cy="12" r="1" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="oi-splitter-resize-icon"
            >
              <circle cx="12" cy="9" r="1" />
              <circle cx="12" cy="15" r="1" />
            </svg>
          </div>
        </slot>
      </Splitter.ResizeTrigger>
    </template>
  </Splitter.Root>
</template>


