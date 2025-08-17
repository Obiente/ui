<script setup lang="ts">
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { computed } from 'vue'

export interface RatingGroupProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current rating value
   */
  value?: number
  
  /**
   * Maximum rating value
   */
  count?: number
  
  /**
   * Allow half values
   */
  allowHalf?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Color scheme (semantic for theme system)
   */
  colorScheme?: 'default' | 'primary' | 'secondary' | 'warning'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<RatingGroupProps>(), {
  themeClasses: '',
  value: 0,
  count: 5,
  allowHalf: false,
  readOnly: false,
  disabled: false,
  size: 'md',
  colorScheme: 'warning',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: number]
  'value-change': [details: { value: number }]
  'hover-change': [details: { hoveredValue: number }]
}>()

/**
 * Generate rating group classes for theme system
 */
const ratingGroupClasses = computed(() => {
  const classes = ['oi-rating-group']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push('oi-rating-group--default')
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-rating-group--${props.size}`)
  
  // Add color scheme class
  classes.push(`oi-rating-group--${props.colorScheme}`)
  
  if (props.disabled) {
    classes.push('oi-rating-group--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-rating-group--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: number }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}

/**
 * Handle hover change
 */
const handleHoverChange = (details: { hoveredValue: number }) => {
  emit('hover-change', details)
}
</script>

<template>
  <RatingGroup.Root
    :class="ratingGroupClasses"
    :value="value"
    :count="count"
    :allow-half="allowHalf"
    :read-only="readOnly"
    :disabled="disabled"
    @value-change="handleValueChange"
    @hover-change="handleHoverChange"
  >
    <RatingGroup.Label v-if="$slots.label" class="oi-rating-group-label">
      <slot name="label" />
    </RatingGroup.Label>
    
    <RatingGroup.Control class="oi-rating-group-control">
      <RatingGroup.Context>
        <template #default="{ items }">
          <RatingGroup.Item
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            class="oi-rating-group-item"
          >
            <RatingGroup.ItemContext>
              <template #default="{ highlighted, half }">
                <slot name="item" :item="item" :highlighted="highlighted" :half="half">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="oi-rating-group-icon"
                    :class="{
                      'oi-rating-group-icon--highlighted': highlighted,
                      'oi-rating-group-icon--half': half
                    }"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </slot>
              </template>
            </RatingGroup.ItemContext>
          </RatingGroup.Item>
        </template>
      </RatingGroup.Context>
    </RatingGroup.Control>
    
    <RatingGroup.HiddenInput />
  </RatingGroup.Root>
</template>


