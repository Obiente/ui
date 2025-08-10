<template>
  <div 
    :class="[
      'ob-textarea-container',
      { 
        'ob-textarea-disabled': disabled,
        'ob-textarea-error': error
      }
    ]"
  >
    <label 
      v-if="label" 
      :for="id" 
      class="ob-textarea-label"
    >
      {{ label }}
      <span v-if="required" class="ob-textarea-required">*</span>
    </label>
    
    <div class="ob-textarea-wrapper">
      <textarea
        :id="id"
        :class="[
          'ob-textarea',
          themeClasses || `ob-textarea-${variant}`,
          { 'ob-textarea-resize-none': !resizable }
        ]"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        @input="updateValue($event)"
        @blur="onBlur"
        @focus="onFocus"
        v-bind="$attrs"
      ></textarea>
    </div>
    
    <!-- Character count -->
    <div
      v-if="maxlength && showCharacterCount"
      class="ob-textarea-character-count"
    >
      {{ modelValue.length }} / {{ maxlength }}
    </div>
    
    <!-- Helper or error text -->
    <div v-if="error" class="ob-textarea-error-text">
      {{ error }}
    </div>
    <div v-else-if="helperText" class="ob-textarea-helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObTextarea',
  inheritAttrs: false,
  
  props: {
    /**
     * The textarea value (v-model)
     */
    modelValue: {
      type: String,
      default: '',
    },
    
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Unique identifier for the textarea
     */
    id: {
      type: String,
      default: () => `textarea-${Math.random().toString(36).substring(2, 9)}`,
    },
    
    /**
     * Label for the textarea
     */
    label: {
      type: String,
      default: '',
    },
    
    /**
     * Placeholder text
     */
    placeholder: {
      type: String,
      default: '',
    },
    
    /**
     * Whether the textarea is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the textarea is required
     */
    required: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Number of visible text lines
     */
    rows: {
      type: Number,
      default: 4,
    },
    
    /**
     * Maximum number of characters
     */
    maxlength: {
      type: Number,
      default: undefined,
    },
    
    /**
     * Whether to show character count when maxlength is set
     */
    showCharacterCount: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the textarea can be resized
     */
    resizable: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Error message
     */
    error: {
      type: String,
      default: '',
    },
    
    /**
     * Helper text to display below the textarea
     */
    helperText: {
      type: String,
      default: '',
    },
    
    /**
     * Textarea variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
  },
  
  emits: ['update:modelValue', 'blur', 'focus', 'input'],
  
  setup(props, { emit }) {
    /**
     * Update the model value
     */
    const updateValue = (event: Event) => {
      const value = (event.target as HTMLTextAreaElement).value;
      emit('update:modelValue', value);
      emit('input', event);
    };
    
    /**
     * Handle blur event
     */
    const onBlur = (event: FocusEvent) => {
      emit('blur', event);
    };
    
    /**
     * Handle focus event
     */
    const onFocus = (event: FocusEvent) => {
      emit('focus', event);
    };
    
    return {
      updateValue,
      onBlur,
      onFocus,
    };
  },
});
</script>

<style>
.ob-textarea-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ob-textarea-label {
  display: block;
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-gray-700, #374151);
  margin-bottom: 0.25rem;
}

.ob-textarea-required {
  color: var(--color-error, #ef4444);
  margin-left: 0.125rem;
}

.ob-textarea-wrapper {
  position: relative;
}

.ob-textarea {
  display: block;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-md, 0.375rem);
  border: 1px solid var(--color-gray-300, #d1d5db);
  background-color: var(--color-white, #ffffff);
  color: var(--color-gray-800, #1f2937);
  font-size: var(--font-size-base, 1rem);
  line-height: 1.5;
  transition: all 0.15s ease;
}

.ob-textarea-resize-none {
  resize: none;
}

.ob-textarea:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ob-textarea-character-count {
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--color-gray-500, #6b7280);
  margin-top: 0.25rem;
}

.ob-textarea-helper-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-gray-500, #6b7280);
}

.ob-textarea-error-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-error, #ef4444);
}

/* Error state */
.ob-textarea-error .ob-textarea {
  border-color: var(--color-error, #ef4444);
}

.ob-textarea-error .ob-textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}

/* Disabled state */
.ob-textarea-disabled .ob-textarea {
  background-color: var(--color-gray-100, #f3f4f6);
  border-color: var(--color-gray-200, #e5e7eb);
  color: var(--color-gray-400, #9ca3af);
  cursor: not-allowed;
}

.ob-textarea-disabled .ob-textarea-label {
  color: var(--color-gray-400, #9ca3af);
}

/* Variant styles - subtle accents for different variants */
.ob-textarea-primary:focus {
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ob-textarea-secondary:focus {
  border-color: var(--color-gray-500, #6b7280);
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.ob-textarea-success:focus {
  border-color: var(--color-success, #10b981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.ob-textarea-warning:focus {
  border-color: var(--color-warning, #f59e0b);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.ob-textarea-error:focus {
  border-color: var(--color-error, #ef4444);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}
</style>
