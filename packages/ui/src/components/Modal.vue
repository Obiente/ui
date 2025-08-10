<template>
  <teleport to="body">
    <transition name="ob-modal-fade">
      <div 
        v-if="modelValue" 
        :class="[
          'ob-modal-overlay', 
          themeClasses || `ob-modal-${variant}`,
          { 'ob-modal-overlay-blur': blur }
        ]"
        @click="handleOverlayClick"
      >
        <div 
          class="ob-modal"
          :class="{ 
            'ob-modal-sm': size === 'sm',
            'ob-modal-md': size === 'md',
            'ob-modal-lg': size === 'lg',
            'ob-modal-xl': size === 'xl',
            'ob-modal-fullscreen': size === 'fullscreen'
          }"
          @click.stop
        >
          <div class="ob-modal-header">
            <slot name="header">
              <h3 class="ob-modal-title">{{ title }}</h3>
              <button 
                v-if="closeButton" 
                class="ob-modal-close" 
                @click="close"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </slot>
          </div>
          
          <div class="ob-modal-body">
            <slot></slot>
          </div>
          
          <div v-if="$slots.footer" class="ob-modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'ObModal',
  
  props: {
    /**
     * Controls the visibility of the modal (v-model)
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
     * Modal title when using default header slot
     */
    title: {
      type: String,
      default: '',
    },
    
    /**
     * Whether to show the close button in the header
     */
    closeButton: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Whether to close the modal when clicking outside
     */
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Whether to close the modal when pressing escape key
     */
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Modal size
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg', 'xl', 'fullscreen'].includes(value),
    },
    
    /**
     * Whether to apply backdrop blur effect
     */
    blur: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Modal variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
    },
  },
  
  emits: ['update:modelValue', 'close', 'open'],
  
  setup(props, { emit }) {
    /**
     * Close the modal
     */
    const close = () => {
      emit('update:modelValue', false);
      emit('close');
    };
    
    /**
     * Open the modal
     */
    const open = () => {
      emit('update:modelValue', true);
      emit('open');
    };
    
    /**
     * Handle overlay click
     */
    const handleOverlayClick = () => {
      if (props.closeOnClickOutside) {
        close();
      }
    };
    
    /**
     * Handle escape key press
     */
    const handleEscKey = (event: KeyboardEvent) => {
      if (props.closeOnEsc && props.modelValue && event.key === 'Escape') {
        close();
      }
    };
    
    /**
     * Manage body scroll when modal is open
     */
    const toggleBodyScroll = (lock: boolean) => {
      if (lock) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };
    
    // Watch for changes to modelValue
    watch(() => props.modelValue, (value) => {
      toggleBodyScroll(value);
    }, { immediate: true });
    
    // Event listeners
    onMounted(() => {
      document.addEventListener('keydown', handleEscKey);
    });
    
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleEscKey);
      toggleBodyScroll(false);
    });
    
    return {
      close,
      open,
      handleOverlayClick,
    };
  },
});
</script>

<style>
.ob-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.ob-modal-overlay-blur {
  backdrop-filter: blur(4px);
}

.ob-modal {
  background-color: var(--color-white, #ffffff);
  border-radius: var(--radius-lg, 0.5rem);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 2rem);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

/* Modal sizes */
.ob-modal-sm {
  max-width: 384px;
}

.ob-modal-md {
  max-width: 512px;
}

.ob-modal-lg {
  max-width: 768px;
}

.ob-modal-xl {
  max-width: 1024px;
}

.ob-modal-fullscreen {
  max-width: none;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  margin: 0;
}

/* Modal header */
.ob-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-gray-200, #e5e7eb);
}

.ob-modal-title {
  margin: 0;
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  line-height: 1.5;
  color: var(--color-gray-900, #111827);
}

.ob-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border-radius: var(--radius-md, 0.375rem);
  color: var(--color-gray-500, #6b7280);
  transition: all 0.15s ease;
}

.ob-modal-close:hover {
  background-color: var(--color-gray-100, #f3f4f6);
  color: var(--color-gray-700, #374151);
}

/* Modal body */
.ob-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Modal footer */
.ob-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-gray-200, #e5e7eb);
  background-color: var(--color-gray-50, #f9fafb);
}

/* Modal animations */
.ob-modal-fade-enter-active,
.ob-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.ob-modal-fade-enter-from,
.ob-modal-fade-leave-to {
  opacity: 0;
}

.ob-modal-fade-enter-active .ob-modal,
.ob-modal-fade-leave-active .ob-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.ob-modal-fade-enter-from .ob-modal,
.ob-modal-fade-leave-to .ob-modal {
  transform: scale(0.95);
  opacity: 0;
}

/* Variant accents - subtle accents for different variants */
.ob-modal-primary .ob-modal-header {
  border-top: 4px solid var(--color-primary, #3b82f6);
}

.ob-modal-secondary .ob-modal-header {
  border-top: 4px solid var(--color-gray-400, #9ca3af);
}

.ob-modal-success .ob-modal-header {
  border-top: 4px solid var(--color-success, #10b981);
}

.ob-modal-warning .ob-modal-header {
  border-top: 4px solid var(--color-warning, #f59e0b);
}

.ob-modal-error .ob-modal-header {
  border-top: 4px solid var(--color-error, #ef4444);
}
</style>
