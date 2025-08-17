<script setup lang="ts">
import { Combobox } from '@ark-ui/vue/combobox'
import { computed } from 'vue'

export interface ComboboxOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface ComboboxProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected value
   */
  value?: string | number | null
  
  /**
   * Available options
   */
  options?: ComboboxOption[]
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Multiple selection
   */
  multiple?: boolean
  
  /**
   * Allow custom values
   */
  allowCustomValue?: boolean
  
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

const props = withDefaults(defineProps<ComboboxProps>(), {
  themeClasses: '',
  value: null,
  options: () => [],
  placeholder: 'Select an option',
  disabled: false,
  multiple: false,
  allowCustomValue: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string | number | null]
  change: [value: string | number | null]
  'input-value-change': [value: string]
  focus: []
  blur: []
}>()

/**
 * Generate combobox classes for theme system
 */
const comboboxClasses = computed(() => {
  const classes = ['oi-combobox']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-combobox--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-combobox--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-combobox--disabled')
  }
  
  if (props.multiple) {
    classes.push('oi-combobox--multiple')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: any) => {
  const newValue = props.multiple ? details.value : details.value[0] || null
  emit('update:value', newValue)
  emit('change', newValue)
}

/**
 * Handle input value change
 */
const handleInputValueChange = (details: any) => {
  emit('input-value-change', details.inputValue)
}
</script>

<template>
  <Combobox.Root
    :class="comboboxClasses"
    :value="Array.isArray(value) ? value : (value ? [value] : [])"
    :items="options"
    :disabled="disabled"
    :multiple="multiple"
    :allow-custom-value="allowCustomValue"
    @value-change="handleValueChange"
    @input-value-change="handleInputValueChange"
  >
    <Combobox.Label v-if="$slots.label" class="oi-combobox-label">
      <slot name="label" />
    </Combobox.Label>
    
    <Combobox.Control class="oi-combobox-control">
      <Combobox.Input
        class="oi-combobox-input"
        :placeholder="placeholder"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
      <Combobox.Trigger class="oi-combobox-trigger">
        <slot name="trigger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-combobox-icon">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </slot>
      </Combobox.Trigger>
    </Combobox.Control>
    
    <Combobox.Positioner>
      <Combobox.Content class="oi-combobox-content">
        <Combobox.ItemGroup class="oi-combobox-item-group">
          <Combobox.ItemGroupLabel v-if="$slots.groupLabel" class="oi-combobox-group-label">
            <slot name="groupLabel" />
          </Combobox.ItemGroupLabel>
          
          <Combobox.Item
            v-for="option in options"
            :key="option.value"
            :item="option"
            :disabled="option.disabled"
            class="oi-combobox-item"
          >
            <Combobox.ItemText class="oi-combobox-item-text">
              {{ option.label }}
            </Combobox.ItemText>
            <Combobox.ItemIndicator class="oi-combobox-item-indicator">
              <slot name="itemIndicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-combobox-check-icon">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </slot>
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.ItemGroup>
        
        <div v-if="$slots.emptyState" class="oi-combobox-empty">
          <slot name="emptyState" />
        </div>
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
</template>


