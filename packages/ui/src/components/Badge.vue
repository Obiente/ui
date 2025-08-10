<template>
  <component
    :is="as"
    :class="[
      'ob-badge',
      themeClasses || `ob-badge-${variant}`,
      sizeClasses,
      { 'ob-badge-outline': outline && !themeClasses },
      customClasses
    ]"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObBadge',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * HTML tag to use for the badge
     */
    as: {
      type: String,
      default: 'span',
    },
    
    /**
     * Badge variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
    
    /**
     * Badge size
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
    
    /**
     * Whether to use outline style
     */
    outline: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Additional CSS classes
     */
    customClasses: {
      type: String,
      default: '',
    },
  },
  
  setup(props) {
    /**
     * Computed size classes
     */
    const sizeClasses = computed(() => `ob-badge-${props.size}`);
    
    return {
      sizeClasses,
    };
  },
});
</script>

<style>
.ob-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  white-space: nowrap;
}

/* Badge Sizes */
.ob-badge-sm {
  padding: 0.125rem 0.375rem;
  font-size: 0.675rem;
}

.ob-badge-md {
  padding: 0.25rem 0.5rem;
}

.ob-badge-lg {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

/* Badge Variants - Fallbacks if theme classes not provided */
.ob-badge-primary {
  background-color: var(--color-primary, #3b82f6);
  color: white;
}

.ob-badge-secondary {
  background-color: var(--color-gray-200, #e5e7eb);
  color: var(--color-gray-800, #1f2937);
}

.ob-badge-success {
  background-color: var(--color-success, #10b981);
  color: white;
}

.ob-badge-warning {
  background-color: var(--color-warning, #f59e0b);
  color: white;
}

.ob-badge-error {
  background-color: var(--color-error, #ef4444);
  color: white;
}

/* Outline Variants */
.ob-badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
}

.ob-badge-outline.ob-badge-primary {
  color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.ob-badge-outline.ob-badge-secondary {
  color: var(--color-gray-600, #4b5563);
  border-color: var(--color-gray-300, #d1d5db);
}

.ob-badge-outline.ob-badge-success {
  color: var(--color-success, #10b981);
  border-color: var(--color-success, #10b981);
}

.ob-badge-outline.ob-badge-warning {
  color: var(--color-warning, #f59e0b);
  border-color: var(--color-warning, #f59e0b);
}

.ob-badge-outline.ob-badge-error {
  color: var(--color-error, #ef4444);
  border-color: var(--color-error, #ef4444);
}
</style>
