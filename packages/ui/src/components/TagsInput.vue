<script setup lang="ts">
import { TagsInput } from '@ark-ui/vue/tags-input'
import { computed } from 'vue'

export interface TagsInputProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected tags
   */
  value?: string[]
  
  /**
   * Maximum number of tags
   */
  max?: number
  
  /**
   * Allow duplicates
   */
  allowDuplicates?: boolean
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
  /**
   * Delimiter for parsing input
   */
  delimiter?: string | RegExp
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TagsInputProps>(), {
  themeClasses: '',
  value: () => [],
  max: undefined,
  allowDuplicates: false,
  placeholder: 'Add tags...',
  disabled: false,
  readOnly: false,
  delimiter: ',',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string[]]
  'value-change': [details: { value: string[] }]
  'value-invalid': [details: { reason: string }]
  highlight: [details: { highlightedValue: string | null }]
  focus: []
  blur: []
}>()

/**
 * Generate tags input classes for theme system
 */
const tagsInputClasses = computed(() => {
  const classes = ['oi-tags-input']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-tags-input--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-tags-input--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-tags-input--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-tags-input--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string[] }) => {
  emit('update:value', details.value)
  emit('value-change', details)
}

/**
 * Handle invalid value
 */
const handleValueInvalid = (details: { reason: string }) => {
  emit('value-invalid', details)
}

/**
 * Handle highlight change
 */
const handleHighlight = (details: { highlightedValue: string | null }) => {
  emit('highlight', details)
}
</script>

<template>
  <TagsInput.Root
    :class="tagsInputClasses"
    :value="value"
    :max="max"
    :allow-duplicates="allowDuplicates"
    :disabled="disabled"
    :read-only="readOnly"
    :delimiter="delimiter"
    @value-change="handleValueChange"
    @value-invalid="handleValueInvalid"
    @highlight-change="handleHighlight"
  >
    <TagsInput.Label v-if="$slots.label" class="oi-tags-input-label">
      <slot name="label" />
    </TagsInput.Label>
    
    <TagsInput.Control class="oi-tags-input-control">
      <TagsInput.Context>
        <template #default="{ value }">
          <TagsInput.Item
            v-for="(tag, index) in value"
            :key="`${tag}${index}`"
            :index="index"
            :value="tag"
            class="oi-tags-input-item"
          >
            <TagsInput.ItemPreview class="oi-tags-input-item-preview">
              <TagsInput.ItemText class="oi-tags-input-item-text">{{ tag }}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger class="oi-tags-input-item-delete">
                <slot name="deleteIcon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-tags-input-delete-icon">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </slot>
              </TagsInput.ItemDeleteTrigger>
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput class="oi-tags-input-item-input" />
          </TagsInput.Item>
          
          <TagsInput.Input
            class="oi-tags-input-input"
            :placeholder="placeholder"
            @focus="emit('focus')"
            @blur="emit('blur')"
          />
        </template>
      </TagsInput.Context>
    </TagsInput.Control>
    
    <TagsInput.ClearTrigger v-if="$slots.clearTrigger" class="oi-tags-input-clear">
      <slot name="clearTrigger" />
    </TagsInput.ClearTrigger>
    
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>


