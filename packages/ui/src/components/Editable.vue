<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { computed } from 'vue'

export interface EditableProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current value
   */
  value?: string
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Auto-resize input
   */
  autoResize?: boolean
  
  /**
   * Submit on blur
   */
  submitMode?: 'enter' | 'blur' | 'both' | 'none'
  
  /**
   * Start with edit mode
   */
  startWithEditView?: boolean
  
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
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<EditableProps>(), {
  themeClasses: '',
  value: '',
  placeholder: 'Click to edit',
  autoResize: false,
  submitMode: 'enter',
  startWithEditView: false,
  disabled: false,
  readOnly: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'value-change': [details: { value: string }]
  'value-commit': [details: { value: string }]
  'value-revert': [details: { value: string }]
  'edit-change': [details: { editing: boolean }]
}>()

/**
 * Generate editable classes for theme system
 */
const editableClasses = computed(() => {
  const classes = ['oi-editable']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-editable--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-editable--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-editable--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-editable--readonly')
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
 * Handle value commit
 */
const handleValueCommit = (details: { value: string }) => {
  emit('value-commit', details)
}

/**
 * Handle value revert
 */
const handleValueRevert = (details: { value: string }) => {
  emit('value-revert', details)
}

/**
 * Handle edit change
 */
const handleEditChange = (details: { editing: boolean }) => {
  emit('edit-change', details)
}
</script>

<template>
  <Editable.Root
    :class="editableClasses"
    :value="value"
    :placeholder="placeholder"
    :auto-resize="autoResize"
    :submit-mode="submitMode"
    :start-with-edit-view="startWithEditView"
    :disabled="disabled"
    :read-only="readOnly"
    @value-change="handleValueChange"
    @value-commit="handleValueCommit"
    @value-revert="handleValueRevert"
    @edit-change="handleEditChange"
  >
    <Editable.Context>
      <template #default="{ editing }">
        <Editable.Label v-if="$slots.label" class="oi-editable-label">
          <slot name="label" />
        </Editable.Label>
        
        <Editable.Area class="oi-editable-area">
          <Editable.Input v-if="editing" class="oi-editable-input" />
          <Editable.Preview v-else class="oi-editable-preview" />
        </Editable.Area>
        
        <Editable.Control class="oi-editable-control">
          <Editable.EditTrigger v-if="!editing" class="oi-editable-edit-trigger">
            <slot name="editIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-editable-icon">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </slot>
          </Editable.EditTrigger>
          
          <template v-if="editing">
            <Editable.SubmitTrigger class="oi-editable-submit-trigger">
              <slot name="submitIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-editable-icon">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </slot>
            </Editable.SubmitTrigger>
            
            <Editable.CancelTrigger class="oi-editable-cancel-trigger">
              <slot name="cancelIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-editable-icon">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </slot>
            </Editable.CancelTrigger>
          </template>
        </Editable.Control>
      </template>
    </Editable.Context>
  </Editable.Root>
</template>


