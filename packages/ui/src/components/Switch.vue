<template>
  <label 
    :class="[
      'ob-switch',
      themeClasses || `ob-switch-${variant}`,
      { 
        'ob-switch-checked': modelValue,
        'ob-switch-disabled': disabled,
        'ob-switch-sm': size === 'sm',
        'ob-switch-md': size === 'md',
        'ob-switch-lg': size === 'lg'
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="ob-switch-input"
      @change="toggle"
      v-bind="$attrs"
    />
    <span class="ob-switch-slider">
      <span class="ob-switch-thumb"></span>
    </span>
    
    <span v-if="$slots.default" class="ob-switch-label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObSwitch',
  inheritAttrs: false,
  
  props: {
    /**
     * The switch state (v-model)
     */
    modelValue: {
      type: Boolean,
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
     * Whether the switch is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Size of the switch
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
    
    /**
     * Switch variant
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
     * Toggle the switch state
     */
    const toggle = (event: Event) => {
      const checked = (event.target as HTMLInputElement).checked;
      emit('update:modelValue', checked);
      emit('change', checked);
    };
    
    return {
      toggle,
    };
  },
});
</script>

<style>
.ob-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.ob-switch-input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.ob-switch-slider {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
  border-radius: 999px;
  background-color: var(--color-gray-300, #d1d5db);
  transition: all 0.2s ease;
}

.ob-switch-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Checked state - base */
.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-primary, #3b82f6);
}

.ob-switch-checked .ob-switch-thumb {
  transform: translateX(1.25rem);
}

/* Focus state */
.ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Sizes */
.ob-switch-sm .ob-switch-slider {
  width: 2rem;
  height: 1rem;
}

.ob-switch-sm .ob-switch-thumb {
  width: 0.75rem;
  height: 0.75rem;
}

.ob-switch-sm.ob-switch-checked .ob-switch-thumb {
  transform: translateX(1rem);
}

.ob-switch-lg .ob-switch-slider {
  width: 3rem;
  height: 1.5rem;
}

.ob-switch-lg .ob-switch-thumb {
  width: 1.25rem;
  height: 1.25rem;
}

.ob-switch-lg.ob-switch-checked .ob-switch-thumb {
  transform: translateX(1.5rem);
}

/* Label */
.ob-switch-label {
  margin-left: 0.5rem;
  font-size: var(--font-size-base, 1rem);
  color: var(--color-gray-700, #374151);
}

/* Disabled state */
.ob-switch-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ob-switch-disabled .ob-switch-slider {
  background-color: var(--color-gray-200, #e5e7eb);
}

/* Variant styles */
.ob-switch-primary.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-primary, #3b82f6);
}

.ob-switch-secondary.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-gray-600, #4b5563);
}

.ob-switch-success.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-success, #10b981);
}

.ob-switch-warning.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-warning, #f59e0b);
}

.ob-switch-error.ob-switch-checked .ob-switch-slider {
  background-color: var(--color-error, #ef4444);
}

/* Focus state for variants */
.ob-switch-primary .ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ob-switch-secondary .ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.3);
}

.ob-switch-success .ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.ob-switch-warning .ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.ob-switch-error .ob-switch-input:focus + .ob-switch-slider {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}
</style>
