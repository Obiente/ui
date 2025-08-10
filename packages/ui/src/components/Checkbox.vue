<template>
  <div class="ob-checkbox-container">
    <label 
      :class="[
        'ob-checkbox', 
        themeClasses || `ob-checkbox-${variant}`,
        { 'ob-checkbox-disabled': disabled }
      ]"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        :value="value"
        :name="name"
        :disabled="disabled"
        class="ob-checkbox-input"
        @change="updateValue($event)"
        v-bind="$attrs"
      />
      <span class="ob-checkbox-checkmark"></span>
      <span v-if="$slots.default" class="ob-checkbox-label">
        <slot></slot>
      </span>
    </label>
    <div v-if="helperText" class="ob-checkbox-helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObCheckbox',
  inheritAttrs: false,
  
  props: {
    /**
     * The checked state of the checkbox (v-model)
     */
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },
    
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * The value of the checkbox when used with v-model with multiple checkboxes
     */
    value: {
      type: [String, Number, Boolean, Object],
      default: undefined,
    },
    
    /**
     * Name attribute for the input field
     */
    name: {
      type: String,
      default: '',
    },
    
    /**
     * Whether the checkbox is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Helper text to display below the checkbox
     */
    helperText: {
      type: String,
      default: '',
    },
    
    /**
     * Checkbox variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
  },
  
  emits: ['update:modelValue', 'change'],
  
  setup(props, { emit }) {
    /**
     * Updates the v-model value
     */
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      let value;
      
      if (Array.isArray(props.modelValue)) {
        const newValue = [...props.modelValue];
        const index = newValue.indexOf(props.value);
        
        if (target.checked) {
          if (index === -1 && props.value !== undefined) {
            newValue.push(props.value);
          }
        } else {
          if (index !== -1) {
            newValue.splice(index, 1);
          }
        }
        value = newValue;
      } else {
        value = target.checked;
      }
      
      emit('update:modelValue', value);
      emit('change', value);
    };
    
    return {
      updateValue,
    };
  },
});
</script>

<style>
.ob-checkbox-container {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ob-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  font-size: var(--font-size-base, 1rem);
}

.ob-checkbox-input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  cursor: pointer;
}

.ob-checkbox-checkmark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  width: 1.25rem;
  border: 2px solid var(--color-gray-400, #9ca3af);
  border-radius: var(--radius-sm, 0.25rem);
  background-color: transparent;
  margin-right: 0.5rem;
  transition: all 0.2s ease;
}

.ob-checkbox-checkmark:after {
  content: "";
  position: absolute;
  display: none;
  width: 0.4rem;
  height: 0.7rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-10%, -5%);
}

.ob-checkbox-input:checked ~ .ob-checkbox-checkmark:after {
  display: block;
}

/* Checkbox focus styles */
.ob-checkbox-input:focus ~ .ob-checkbox-checkmark {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Checkbox variants */
.ob-checkbox-primary .ob-checkbox-input:checked ~ .ob-checkbox-checkmark {
  background-color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.ob-checkbox-secondary .ob-checkbox-input:checked ~ .ob-checkbox-checkmark {
  background-color: var(--color-gray-600, #4b5563);
  border-color: var(--color-gray-600, #4b5563);
}

.ob-checkbox-success .ob-checkbox-input:checked ~ .ob-checkbox-checkmark {
  background-color: var(--color-success, #10b981);
  border-color: var(--color-success, #10b981);
}

.ob-checkbox-warning .ob-checkbox-input:checked ~ .ob-checkbox-checkmark {
  background-color: var(--color-warning, #f59e0b);
  border-color: var(--color-warning, #f59e0b);
}

.ob-checkbox-error .ob-checkbox-input:checked ~ .ob-checkbox-checkmark {
  background-color: var(--color-error, #ef4444);
  border-color: var(--color-error, #ef4444);
}

/* Disabled state */
.ob-checkbox-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ob-checkbox-disabled .ob-checkbox-checkmark {
  border-color: var(--color-gray-300, #d1d5db);
  background-color: var(--color-gray-100, #f3f4f6);
}

.ob-checkbox-helper-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-gray-500, #6b7280);
  margin-top: 0.25rem;
}
</style>
