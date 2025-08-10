<template>
  <div :class="['ob-radio-group', { 'ob-radio-group-inline': inline }]">
    <label 
      v-for="option in options" 
      :key="option.value"
      :class="[
        'ob-radio',
        themeClasses || `ob-radio-${variant}`,
        { 'ob-radio-disabled': disabled || option.disabled }
      ]"
    >
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="disabled || option.disabled"
        class="ob-radio-input"
        @change="updateValue(option.value)"
        v-bind="$attrs"
      />
      <span class="ob-radio-indicator"></span>
      <span class="ob-radio-label">{{ option.label }}</span>
    </label>
    
    <div v-if="helperText" class="ob-radio-helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export default defineComponent({
  name: 'ObRadioGroup',
  inheritAttrs: false,
  
  props: {
    /**
     * The selected radio value (v-model)
     */
    modelValue: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Radio options array
     */
    options: {
      type: Array as PropType<RadioOption[]>,
      required: true,
    },
    
    /**
     * Name attribute for the radio group
     */
    name: {
      type: String,
      required: true,
    },
    
    /**
     * Whether all radios in the group are disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Helper text to display below the radio group
     */
    helperText: {
      type: String,
      default: '',
    },
    
    /**
     * Whether to display radios inline
     */
    inline: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Radio variant
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
    const updateValue = (value: any) => {
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
.ob-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ob-radio-group-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.ob-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  font-size: var(--font-size-base, 1rem);
}

.ob-radio-input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  cursor: pointer;
}

.ob-radio-indicator {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  width: 1.25rem;
  border: 2px solid var(--color-gray-400, #9ca3af);
  border-radius: 50%;
  background-color: transparent;
  margin-right: 0.5rem;
  transition: all 0.2s ease;
}

.ob-radio-indicator:after {
  content: "";
  position: absolute;
  display: none;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
}

.ob-radio-input:checked ~ .ob-radio-indicator:after {
  display: block;
}

/* Radio focus styles */
.ob-radio-input:focus ~ .ob-radio-indicator {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Radio variants */
.ob-radio-primary .ob-radio-input:checked ~ .ob-radio-indicator {
  background-color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.ob-radio-secondary .ob-radio-input:checked ~ .ob-radio-indicator {
  background-color: var(--color-gray-600, #4b5563);
  border-color: var(--color-gray-600, #4b5563);
}

.ob-radio-success .ob-radio-input:checked ~ .ob-radio-indicator {
  background-color: var(--color-success, #10b981);
  border-color: var(--color-success, #10b981);
}

.ob-radio-warning .ob-radio-input:checked ~ .ob-radio-indicator {
  background-color: var(--color-warning, #f59e0b);
  border-color: var(--color-warning, #f59e0b);
}

.ob-radio-error .ob-radio-input:checked ~ .ob-radio-indicator {
  background-color: var(--color-error, #ef4444);
  border-color: var(--color-error, #ef4444);
}

/* Disabled state */
.ob-radio-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ob-radio-disabled .ob-radio-indicator {
  border-color: var(--color-gray-300, #d1d5db);
  background-color: var(--color-gray-100, #f3f4f6);
}

.ob-radio-label {
  font-size: var(--font-size-base, 1rem);
  color: var(--color-gray-700, #374151);
}

.ob-radio-helper-text {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-gray-500, #6b7280);
  margin-top: 0.25rem;
}
</style>
