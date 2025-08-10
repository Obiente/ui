<template>
  <div :class="['ob-input-wrapper', wrapperClasses]">
    <label 
      v-if="label" 
      :for="inputId"
      :class="['ob-input-label', labelClasses]"
    >
      {{ label }}
      <span v-if="required" class="ob-input-required">*</span>
    </label>
    
    <div class="ob-input-container">
      <span v-if="$slots.prefix" class="ob-input-prefix">
        <slot name="prefix"></slot>
      </span>
      
      <input
        :id="inputId"
        ref="input"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          'ob-input',
          themeClasses,
          { 'ob-input-error': error },
          { 'ob-input-disabled': disabled },
          { 'ob-input-with-prefix': $slots.prefix },
          { 'ob-input-with-suffix': $slots.suffix },
          inputClasses
        ]"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        @input="updateValue"
        @blur="onBlur"
        @focus="onFocus"
      />
      
      <span v-if="$slots.suffix" class="ob-input-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
    
    <div
      v-if="error && errorMessage"
      :class="['ob-input-error-message', errorMessageClasses]"
    >
      {{ errorMessage }}
    </div>
    
    <div
      v-if="helperText"
      :class="['ob-input-helper-text', helperTextClasses]"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'ObInput',
  
  inheritAttrs: false,
  
  props: {
    /**
     * The input's model value
     */
    modelValue: {
      type: [String, Number],
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
     * The input's type attribute
     */
    type: {
      type: String,
      default: 'text',
    },
    
    /**
     * The input's name attribute
     */
    name: {
      type: String,
      default: '',
    },
    
    /**
     * The input's id attribute
     */
    id: {
      type: String,
      default: '',
    },
    
    /**
     * The input's placeholder text
     */
    placeholder: {
      type: String,
      default: '',
    },
    
    /**
     * The input's label
     */
    label: {
      type: String,
      default: '',
    },
    
    /**
     * Whether the input is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the input is readonly
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the input is required
     */
    required: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the input has an error
     */
    error: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Error message to display
     */
    errorMessage: {
      type: String,
      default: '',
    },
    
    /**
     * Helper text to display below the input
     */
    helperText: {
      type: String,
      default: '',
    },
    
    /**
     * HTML autocomplete attribute
     */
    autocomplete: {
      type: String,
      default: 'off',
    },
    
    /**
     * Additional CSS classes for the wrapper element
     */
    wrapperClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the input element
     */
    inputClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the label element
     */
    labelClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the error message element
     */
    errorMessageClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the helper text element
     */
    helperTextClasses: {
      type: String,
      default: '',
    },
  },
  
  emits: ['update:modelValue', 'blur', 'focus'],
  
  setup(props, { emit }) {
    const input = ref<HTMLInputElement | null>(null);
    
    // Generate a unique ID for the input if not provided
    const inputId = computed(() => props.id || `ob-input-${Math.random().toString(36).substring(2, 9)}`);
    
    // Handle input value update
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };
    
    // Handle input blur event
    const onBlur = (event: FocusEvent) => {
      emit('blur', event);
    };
    
    // Handle input focus event
    const onFocus = (event: FocusEvent) => {
      emit('focus', event);
    };
    
    // Focus the input element programmatically
    const focus = () => {
      input.value?.focus();
    };
    
    return {
      input,
      inputId,
      updateValue,
      onBlur,
      onFocus,
      focus,
    };
  },
});
</script>

<style>
.ob-input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ob-input-label {
  margin-bottom: 0.5rem;
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-foreground, inherit);
}

.ob-input-required {
  color: var(--color-error, #ef4444);
  margin-left: 0.25rem;
}

.ob-input-container {
  position: relative;
  display: flex;
  width: 100%;
}

.ob-input {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: var(--font-size-md, 1rem);
  line-height: var(--line-height-normal, 1.5);
  background-color: var(--color-background, white);
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--radius-md, 0.375rem);
  transition: all 0.2s ease;
}

.ob-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.ob-input::placeholder {
  color: var(--color-foreground-subtle, #9ca3af);
}

.ob-input-with-prefix {
  padding-left: 2.5rem;
}

.ob-input-with-suffix {
  padding-right: 2.5rem;
}

.ob-input-prefix,
.ob-input-suffix {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 2.5rem;
  pointer-events: none;
  color: var(--color-foreground-muted, #6b7280);
}

.ob-input-prefix {
  left: 0;
}

.ob-input-suffix {
  right: 0;
}

.ob-input-error {
  border-color: var(--color-error, #ef4444);
}

.ob-input-error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.ob-input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-background-subtle, #f3f4f6);
}

.ob-input-error-message {
  margin-top: 0.5rem;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-error, #ef4444);
}

.ob-input-helper-text {
  margin-top: 0.5rem;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-foreground-muted, #6b7280);
}
</style>
