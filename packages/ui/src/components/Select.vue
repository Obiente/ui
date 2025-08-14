<script setup lang="ts">
import { Select as ArkSelect, createListCollection } from '@ark-ui/vue/select'
import { computed } from 'vue'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * The select value (v-model)
   */
  modelValue?: string | string[]
  
  /**
   * Unique identifier for the select
   */
  id?: string
  
  /**
   * Label for the select
   */
  label?: string
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Whether the select is disabled
   */
  disabled?: boolean
  
  /**
   * Whether the select is required
   */
  required?: boolean
  
  /**
   * Whether the select allows multiple selections
   */
  multiple?: boolean
  
  /**
   * Error message
   */
  error?: string
  
  /**
   * Helper text to display below the select
   */
  helperText?: string
  
  /**
   * Select variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Select size
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Options for the select
   */
  options?: SelectOption[]
  
  /**
   * Name attribute for forms
   */
  name?: string
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  themeClasses: '',
  modelValue: undefined,
  id: undefined,
  label: '',
  placeholder: 'Select an option',
  disabled: false,
  required: false,
  multiple: false,
  error: '',
  helperText: '',
  variant: 'primary',
  size: 'md',
  options: () => [],
  name: undefined,
  customClasses: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  'value-change': [details: any]
}>()

/**
 * Generate select classes for theme system
 */
const selectClasses = computed(() => {
  const classes = []

  // Use themeClasses if provided, else use theme semantic class
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push('oi-select')
    if (props.variant) classes.push(`oi-select-${props.variant}`)
    if (props.size) classes.push(`oi-select-${props.size}`)
    if (props.disabled) classes.push('oi-select-disabled')
    if (props.multiple) classes.push('oi-select-multiple')
    if (props.error) classes.push('oi-select-error')
  }

  if (props.customClasses) {
    classes.push(props.customClasses)
  }

  return classes
})

/**
 * Handle value changes
 */
const handleValueChange = (details: any) => {
  // Ark UI provides the selected values as an array
  const newValue = props.multiple ? details.value : (details.value[0] || '')
  emit('update:modelValue', newValue)
  emit('value-change', details)
}

/**
 * Convert modelValue to/from array format that Ark UI expects (writable computed for v-model)
 */
const selectValue = computed({
  get: () => {
    if (!props.modelValue) return []
    return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
  },
  set: (value: string[]) => {
    const newValue = props.multiple ? value : (value[0] || '')
    emit('update:modelValue', newValue)
  }
})

/**
 * Create collection for Ark UI Select - this is required!
 */
const collection = computed(() => {
  return createListCollection({
    items: props.options || []
  })
})
</script>

<template>
  <div :class="selectClasses">
    <ArkSelect.Root
      :collection="collection"
      v-model="selectValue"
      :multiple="multiple"
      :disabled="disabled"
      :name="name"
      @value-change="handleValueChange"
    >
      <ArkSelect.Label v-if="label" class="oi-text-foreground oi-text-sm oi-mb-1">
        {{ label }}
        <span v-if="required" class="oi-text-error">*</span>
      </ArkSelect.Label>
      
      <ArkSelect.Control class="oi-bg-surface oi-rounded-md oi-border oi-w-full">
        <ArkSelect.Trigger class="oi-flex oi-items-center oi-justify-between oi-px-3 oi-py-2 oi-w-full">
          <ArkSelect.ValueText :placeholder="placeholder" class="oi-text-foreground oi-text-md" />
          <ArkSelect.Indicator class="oi-ml-2 oi-text-foreground oi-flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      
      <ArkSelect.Positioner>
        <ArkSelect.Content class="oi-bg-surface oi-rounded-md oi-shadow-lg oi-border oi-mt-1 oi-z-50">
          <ArkSelect.ItemGroup>
            <ArkSelect.Item
              v-for="item in collection.items"
              :key="item.value"
              :item="item"
              :disabled="item.disabled"
              class="oi-flex oi-items-center oi-justify-between oi-px-3 oi-py-2 oi-cursor-pointer oi-text-foreground hover:oi-bg-surface-raised focus:oi-bg-surface-raised"
            >
              <ArkSelect.ItemText class="oi-text-foreground oi-text-md">
                {{ item.label }}
              </ArkSelect.ItemText>
              <ArkSelect.ItemIndicator class="oi-text-primary oi-flex-shrink-0 oi-ml-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </ArkSelect.ItemIndicator>
            </ArkSelect.Item>
          </ArkSelect.ItemGroup>
        </ArkSelect.Content>
      </ArkSelect.Positioner>
      
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
    
    <div v-if="error" class="oi-text-error oi-mt-1 oi-text-sm">
      {{ error }}
    </div>
    <div v-else-if="helperText" class="oi-text-muted oi-mt-1 oi-text-sm">
      {{ helperText }}
    </div>
  </div>
</template>


