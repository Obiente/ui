<template>
  <div :class="['ob-card', themeClasses, { 'ob-card-clickable': clickable }, customClasses]" @click="handleClick">
    <div v-if="$slots.header" :class="['ob-card-header', headerClasses]">
      <slot name="header"></slot>
    </div>
    
    <div :class="['ob-card-content', contentClasses]">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" :class="['ob-card-footer', footerClasses]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObCard',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Whether the card is clickable
     */
    clickable: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Additional CSS classes for the card
     */
    customClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the header
     */
    headerClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the content
     */
    contentClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Additional CSS classes for the footer
     */
    footerClasses: {
      type: String,
      default: '',
    },
  },
  
  emits: ['click'],
  
  methods: {
    /**
     * Handle card click event
     */
    handleClick(event: MouseEvent): void {
      if (this.clickable) {
        this.$emit('click', event);
      }
    },
  },
});
</script>

<style>
.ob-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg, 0.5rem);
  background-color: var(--color-background, white);
  border: 1px solid var(--color-border, #e5e7eb);
  overflow: hidden;
}

.ob-card-clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.ob-card-clickable:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.ob-card-header {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 0;
}

.ob-card-content {
  padding: 1.25rem;
  flex: 1 1 auto;
}

.ob-card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem 1.25rem;
}

/* When header is present, adjust top padding for content */
.ob-card-header + .ob-card-content {
  padding-top: 0.75rem;
}
</style>
