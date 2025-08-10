<template>
  <div 
    :class="[
      'ob-select-container',
      { 
        'ob-select-disabled': disabled,
        'ob-select-error': error
      }
    ]"
  >
    <label 
      v-if="label" 
      :for="id" 
      class="ob-select-label"
    >
      {{ label }}
      <span v-if="required" class="ob-select-required">*</span>
    </label>
    
    <div class="ob-select-wrapper">
      <!-- Select prefix slot -->
      <div v-if="$slots.prefix" class="ob-select-prefix">
        <slot name="prefix"></slot>
      </div>
      
      <select
        :id="id"
        :class="[
          'ob-select',
          themeClasses || `ob-select-${variant}`,
          {
            'ob-select-has-prefix': $slots.prefix,
            'ob-select-has-suffix': $slots.suffix
          }
        ]"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :multiple="multiple"
        :size="size"
        @change="updateValue($event)"
        @blur="onBlur"
        @focus="onFocus"
        v-bind="$attrs"
      >
        <option 
          v-if="placeholder && !multiple" 
          value="" 
          disabled
        >
          {{ placeholder }}
        </option>
        <slot></slot>
      </select>
      
      <!-- Select suffix slot -->
      <div v-if="$slots.suffix" class="ob-select-suffix">
        <slot name="suffix"></slot>
      </div>
      
      <!-- Default suffix arrow icon -->
      <div v-if="!$slots.suffix" class="ob-select-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    
    <!-- Helper or error text -->
    <div v-if="error" class="ob-select-error-text">
      {{ error }}
    </div>
    <div v-else-if="helperText" class="ob-select-helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObSelect',
  inheritAttrs: false,
  
  props: {
    /**
     * The select value (v-model)
     */
    modelValue: {
      type: [String, Number, Boolean, Array],
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
     * Unique identifier for the select
     */
    id: {
      type: String,
      default: () => `select-${Math.random().toString(36).substring(2, 9)}`,
    },
    
    /**
     * Label for the select
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
      default: 'Select an option',
    },
    
    /**
     * Whether the select is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the select is required
     */
    required: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the select allows multiple selections
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Size attribute for showing multiple options
     */
    size: {
      type: Number,
      default: undefined,
    },
    
    /**
     * Error message
     */
    error: {
      type: String,
      default: '',
    },
    
    /**
     * Helper text to display below the select
     */
    helperText: {
      type: String,
      default: '',
    },
    
    /**
     * Select variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
  },
  
  emits: ['update:modelValue', 'blur', 'focus', 'change'],
  
  setup(props, { emit }) {
    /**
     * Update the model value
     */
    const updateValue = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      
      let value;
      
      if (props.multiple) {
        value = Array.from(target.selectedOptions).map(option => option.value);
      } else {
        value = target.value;
      }
      
      emit('update:modelValue', value);
      emit('change', event);
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
.ob-select-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ob-select-label {
  display: block;
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-gray-700, #374151);
  margin-bottom: 0.25rem;
}

.ob-select-required {
  color: var(--color-error, #ef4444);
  margin-left: 0.125rem;
}

.ob-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ob-select {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md, 0.375rem);
  border: 1px solid var(--color-gray-300, #d1d5db);
  background-color: var(--color-white, #ffffff);
  color: var(--color-gray-800, #1f2937);
  font-size: var(--font-size-base, 1rem);
  line-height: 1.5;
  transition: all 0.15s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.ob-select-has-prefix {
  padding-left: 2.5rem;
}

.ob-select-has-suffix {
  padding-right: 2.5rem;
}

/* For Firefox */
.ob-select {
  text-indent: 0.01px;
  text-overflow: '';
}

.ob-select:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ob-select-prefix,
.ob-select-suffix {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500, #6b7280);
  pointer-events: none;
  z-index: 1;
}

.ob-select-prefix {
  left: 0;
  padding-left: 0.75rem;
}

.ob-select-suffix {
  right: 0;
  padding-right: 0.75rem;
}

.ob-select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-500, #6b7280);
  pointer-events: none;
}

.ob-select-helper-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-gray-500, #6b7280);
}

.ob-select-error-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-error, #ef4444);
}

/* Error state */
.ob-select-error .ob-select {
  border-color: var(--color-error, #ef4444);
}

.ob-select-error .ob-select:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}

/* Disabled state */
.ob-select-disabled .ob-select {
  background-color: var(--color-gray-100, #f3f4f6);
  border-color: var(--color-gray-200, #e5e7eb);
  color: var(--color-gray-400, #9ca3af);
  cursor: not-allowed;
}

.ob-select-disabled .ob-select-label,
.ob-select-disabled .ob-select-prefix,
.ob-select-disabled .ob-select-suffix,
.ob-select-disabled .ob-select-arrow {
  color: var(--color-gray-400, #9ca3af);
}

/* Variant styles - subtle accents for different variants */
.ob-select-primary:focus {
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ob-select-secondary:focus {
  border-color: var(--color-gray-500, #6b7280);
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.ob-select-success:focus {
  border-color: var(--color-success, #10b981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.ob-select-warning:focus {
  border-color: var(--color-warning, #f59e0b);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.ob-select-error:focus {
  border-color: var(--color-error, #ef4444);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}
</style>
