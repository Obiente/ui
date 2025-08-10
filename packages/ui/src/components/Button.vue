<template>
  <button
    :class="[
      'ob-btn',
      themeClasses,
      sizeClasses,
      variantClasses,
      { 'ob-btn-block': block, 'ob-btn-disabled': disabled },
      customClasses
    ]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <span v-if="$slots.icon && iconPosition === 'left'" class="ob-btn-icon ob-btn-icon-left">
      <slot name="icon" />
    </span>
    <span class="ob-btn-content">
      <slot />
    </span>
    <span v-if="$slots.icon && iconPosition === 'right'" class="ob-btn-icon ob-btn-icon-right">
      <slot name="icon" />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObButton',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Button visual variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => 
        ['primary', 'secondary', 'outline', 'ghost', 'destructive'].includes(value),
    },
    
    /**
     * Button size
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value),
    },
    
    /**
     * Button type attribute
     */
    type: {
      type: String,
      default: 'button',
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
    
    /**
     * Whether button should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether button should take full width of container
     */
    block: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Position of icon relative to button content
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
    },
    
    /**
     * Additional CSS classes
     */
    customClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Specifies the button state
     */
    state: {
      type: String,
      default: '',
      validator: (value: string) => ['', 'loading', 'disabled', 'success', 'error'].includes(value),
    },
  },
  
  emits: ['click'],
  
  computed: {
    /**
     * Classes based on size prop
     */
    sizeClasses(): string {
      return `ob-btn-${this.size}`;
    },
    
    /**
     * Classes based on variant prop
     */
    variantClasses(): string {
      return this.themeClasses || `ob-btn-${this.variant}`;
    },
  },
  
  methods: {
    /**
     * Handle button click event
     */
    handleClick(event: MouseEvent): void {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
});
</script>

<style>
.ob-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md, 0.375rem);
  font-weight: var(--font-weight-medium, 500);
  font-size: var(--font-size-md, 1rem);
  line-height: var(--line-height-none, 1);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

/* Button Sizes */
.ob-btn-sm {
  height: 2rem;
  padding: 0 0.75rem;
  font-size: var(--font-size-sm, 0.875rem);
}

.ob-btn-md {
  height: 2.5rem;
  padding: 0 1rem;
}

.ob-btn-lg {
  height: 3rem;
  padding: 0 1.5rem;
  font-size: var(--font-size-lg, 1.125rem);
}

.ob-btn-xl {
  height: 3.5rem;
  padding: 0 2rem;
  font-size: var(--font-size-xl, 1.25rem);
}

/* Button States */
.ob-btn-disabled, 
.ob-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.ob-btn-block {
  display: flex;
  width: 100%;
}

/* Icon Positioning */
.ob-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ob-btn-icon-left {
  margin-right: 0.5rem;
}

.ob-btn-icon-right {
  margin-left: 0.5rem;
}

/* Fallback variant styles if no theme classes provided */
.ob-btn-primary {
  background-color: var(--color-primary, #3b82f6);
  color: white;
}

.ob-btn-primary:hover {
  background-color: var(--color-primary-dark, #2563eb);
}

.ob-btn-secondary {
  background-color: var(--color-gray-200, #e5e7eb);
  color: var(--color-gray-800, #1f2937);
}

.ob-btn-secondary:hover {
  background-color: var(--color-gray-300, #d1d5db);
}

.ob-btn-outline {
  background-color: transparent;
  border-color: var(--color-gray-300, #d1d5db);
  color: var(--color-gray-700, #374151);
}

.ob-btn-outline:hover {
  background-color: var(--color-gray-100, #f3f4f6);
}

.ob-btn-ghost {
  background-color: transparent;
  color: var(--color-gray-700, #374151);
}

.ob-btn-ghost:hover {
  background-color: var(--color-gray-100, #f3f4f6);
}

.ob-btn-destructive {
  background-color: var(--color-error, #ef4444);
  color: white;
}

.ob-btn-destructive:hover {
  background-color: var(--color-error-600, #dc2626);
}
</style>
