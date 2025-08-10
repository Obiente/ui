<template>
  <div
    v-if="!dismissed"
    :class="[
      'ob-alert',
      themeClasses,
      `ob-alert-${variant}`,
      customClasses
    ]"
    role="alert"
  >
    <div class="ob-alert-content">
      <div v-if="icon || $slots.icon" :class="['ob-alert-icon', iconThemeClasses]">
        <slot name="icon">
          <!-- Info Icon -->
          <svg v-if="variant === 'info'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          
          <!-- Success Icon -->
          <svg v-else-if="variant === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          
          <!-- Warning Icon -->
          <svg v-else-if="variant === 'warning'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          
          <!-- Error Icon -->
          <svg v-else-if="variant === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </slot>
      </div>
      
      <div class="ob-alert-body">
        <h4 v-if="title" :class="['ob-alert-title', titleThemeClasses]">
          {{ title }}
        </h4>
        
        <div :class="['ob-alert-message', messageThemeClasses]">
          <slot></slot>
        </div>
      </div>
    </div>
    
    <button
      v-if="dismissible"
      :class="['ob-alert-dismiss', dismissThemeClasses]"
      @click="dismiss"
      aria-label="Dismiss alert"
    >
      <slot name="dismiss-icon">
        <!-- Dismiss Icon -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ObAlert',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Alert variant/type
     */
    variant: {
      type: String,
      default: 'info',
      validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value),
    },
    
    /**
     * Title to display in the alert
     */
    title: {
      type: String,
      default: '',
    },
    
    /**
     * Whether the alert can be dismissed
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Whether to show an icon
     */
    icon: {
      type: Boolean,
      default: true,
    },
    
    /**
     * Additional CSS classes for the alert
     */
    customClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Theme classes for the icon
     */
    iconThemeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Theme classes for the title
     */
    titleThemeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Theme classes for the message
     */
    messageThemeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Theme classes for the dismiss button
     */
    dismissThemeClasses: {
      type: String,
      default: '',
    },
  },
  
  emits: ['dismiss'],
  
  setup(props, { emit }) {
    const dismissed = ref(false);
    
    const dismiss = () => {
      dismissed.value = true;
      emit('dismiss');
    };
    
    return {
      dismissed,
      dismiss,
    };
  },
});
</script>

<style>
.ob-alert {
  position: relative;
  display: flex;
  padding: 1rem;
  border-radius: var(--radius-md, 0.375rem);
  background-color: var(--color-background-subtle, #f3f4f6);
  border-left: 4px solid;
}

.ob-alert-info {
  border-color: var(--color-info, #3b82f6);
}

.ob-alert-success {
  border-color: var(--color-success, #10b981);
}

.ob-alert-warning {
  border-color: var(--color-warning, #f59e0b);
}

.ob-alert-error {
  border-color: var(--color-error, #ef4444);
}

.ob-alert-content {
  display: flex;
  flex: 1;
}

.ob-alert-icon {
  display: flex;
  align-items: flex-start;
  margin-right: 0.75rem;
}

.ob-alert-info .ob-alert-icon {
  color: var(--color-info, #3b82f6);
}

.ob-alert-success .ob-alert-icon {
  color: var(--color-success, #10b981);
}

.ob-alert-warning .ob-alert-icon {
  color: var(--color-warning, #f59e0b);
}

.ob-alert-error .ob-alert-icon {
  color: var(--color-error, #ef4444);
}

.ob-alert-body {
  flex: 1;
}

.ob-alert-title {
  margin: 0 0 0.25rem;
  font-size: var(--font-size-md, 1rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-foreground, inherit);
}

.ob-alert-message {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-foreground-muted, #6b7280);
}

.ob-alert-dismiss {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin: -0.25rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm, 0.25rem);
  color: var(--color-foreground-muted, #6b7280);
  cursor: pointer;
  transition: all 0.2s ease;
}

.ob-alert-dismiss:hover {
  color: var(--color-foreground, inherit);
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
