<template>
  <div
    ref="dropdownRef"
    :class="[
      'ob-dropdown', 
      themeClasses || `ob-dropdown-${variant}`,
      { 'ob-dropdown-active': isOpen }
    ]"
  >
    <!-- Dropdown trigger -->
    <div 
      class="ob-dropdown-trigger"
      @click="toggle"
    >
      <slot name="trigger">
        <button class="ob-dropdown-button">
          {{ label }}
          <svg class="ob-dropdown-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </slot>
    </div>
    
    <!-- Dropdown content -->
    <transition name="ob-dropdown-transition">
      <div 
        v-show="isOpen"
        :class="[
          'ob-dropdown-content',
          `ob-dropdown-align-${align}`,
          { 'ob-dropdown-content-fullwidth': fullWidth }
        ]"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';

export default defineComponent({
  name: 'ObDropdown',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Label for the dropdown button when using default trigger
     */
    label: {
      type: String,
      default: 'Select',
    },
    
    /**
     * Dropdown variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
    
    /**
     * Alignment of the dropdown content
     */
    align: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
    },
    
    /**
     * Whether the dropdown content should be full width
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether the dropdown should close when clicking outside
     */
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Whether the dropdown is initially open
     */
    modelValue: {
      type: Boolean,
      default: false,
    }
  },
  
  emits: ['update:modelValue', 'open', 'close'],
  
  setup(props, { emit }) {
    const isOpen = ref(props.modelValue);
    const dropdownRef = ref<HTMLElement | null>(null);
    
    /**
     * Open the dropdown
     */
    const open = () => {
      if (!isOpen.value) {
        isOpen.value = true;
        emit('update:modelValue', true);
        emit('open');
      }
    };
    
    /**
     * Close the dropdown
     */
    const close = () => {
      if (isOpen.value) {
        isOpen.value = false;
        emit('update:modelValue', false);
        emit('close');
      }
    };
    
    /**
     * Toggle the dropdown state
     */
    const toggle = () => {
      if (isOpen.value) {
        close();
      } else {
        open();
      }
    };
    
    /**
     * Handle clicks outside the dropdown
     */
    const handleOutsideClick = (event: MouseEvent) => {
      if (props.closeOnClickOutside && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        close();
      }
    };
    
    // Watch for prop changes
    const updateOpenState = () => {
      isOpen.value = props.modelValue;
    };
    
    // Set up click outside handler
    onMounted(() => {
      nextTick(() => {
        document.addEventListener('click', handleOutsideClick);
      });
    });
    
    onUnmounted(() => {
      document.removeEventListener('click', handleOutsideClick);
    });
    
    return {
      isOpen,
      dropdownRef,
      open,
      close,
      toggle,
      updateOpenState
    };
  },
  
  watch: {
    modelValue(newVal) {
      if (this.isOpen !== newVal) {
        this.isOpen = newVal;
      }
    }
  }
});
</script>

<style>
.ob-dropdown {
  position: relative;
  display: inline-block;
}

.ob-dropdown-trigger {
  cursor: pointer;
}

.ob-dropdown-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background-color: var(--color-white, #ffffff);
  color: var(--color-gray-800, #1f2937);
  border: 1px solid var(--color-gray-300, #d1d5db);
  border-radius: var(--radius-md, 0.375rem);
  padding: 0.5rem 0.75rem;
  font-size: var(--font-size-base, 1rem);
  line-height: 1.5;
  font-weight: var(--font-weight-medium, 500);
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 150px;
}

.ob-dropdown-button:hover {
  border-color: var(--color-gray-400, #9ca3af);
}

.ob-dropdown-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  border-color: var(--color-primary, #3b82f6);
}

.ob-dropdown-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.ob-dropdown-active .ob-dropdown-arrow {
  transform: rotate(-180deg);
}

.ob-dropdown-content {
  position: absolute;
  z-index: 100;
  min-width: 200px;
  margin-top: 0.5rem;
  border-radius: var(--radius-md, 0.375rem);
  background-color: var(--color-white, #ffffff);
  border: 1px solid var(--color-gray-200, #e5e7eb);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 300px;
  overflow-y: auto;
}

.ob-dropdown-content-fullwidth {
  width: 100%;
}

.ob-dropdown-align-left {
  left: 0;
}

.ob-dropdown-align-right {
  right: 0;
}

/* Dropdown item styles - for convenience */
.ob-dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--color-gray-700, #374151);
  transition: all 0.15s ease;
}

.ob-dropdown-item:hover {
  background-color: var(--color-gray-100, #f3f4f6);
}

.ob-dropdown-item:active {
  background-color: var(--color-gray-200, #e5e7eb);
}

/* Dropdown transition */
.ob-dropdown-transition-enter-active,
.ob-dropdown-transition-leave-active {
  transition: opacity 0.2s, transform 0.2s;
  transform-origin: top center;
}

.ob-dropdown-transition-enter-from,
.ob-dropdown-transition-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}

/* Variant styles - fallbacks if theme classes not provided */
.ob-dropdown-primary .ob-dropdown-button {
  color: var(--color-white, #ffffff);
  background-color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.ob-dropdown-secondary .ob-dropdown-button {
  color: var(--color-gray-800, #1f2937);
  background-color: var(--color-gray-100, #f3f4f6);
  border-color: var(--color-gray-300, #d1d5db);
}

.ob-dropdown-success .ob-dropdown-button {
  color: var(--color-white, #ffffff);
  background-color: var(--color-success, #10b981);
  border-color: var(--color-success, #10b981);
}

.ob-dropdown-warning .ob-dropdown-button {
  color: var(--color-white, #ffffff);
  background-color: var(--color-warning, #f59e0b);
  border-color: var(--color-warning, #f59e0b);
}

.ob-dropdown-error .ob-dropdown-button {
  color: var(--color-white, #ffffff);
  background-color: var(--color-error, #ef4444);
  border-color: var(--color-error, #ef4444);
}
</style>
