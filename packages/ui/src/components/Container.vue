<template>
  <component
    :is="as"
    :class="[
      'ob-container',
      themeClasses,
      { 'ob-container-fluid': fluid },
      sizeClass,
      customClasses
    ]"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObContainer',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * HTML tag to use for the container
     */
    as: {
      type: String,
      default: 'div',
    },
    
    /**
     * Container size
     */
    size: {
      type: String,
      default: 'lg',
      validator: (value: string) => ['sm', 'md', 'lg', 'xl', '2xl'].includes(value),
    },
    
    /**
     * Whether the container should be fluid (full width)
     */
    fluid: {
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
     * Computed class based on size prop
     */
    const sizeClass = computed(() => {
      if (props.fluid) return '';
      return `ob-container-${props.size}`;
    });
    
    return {
      sizeClass,
    };
  },
});
</script>

<style>
.ob-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .ob-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.ob-container-sm {
  max-width: 640px;
}

.ob-container-md {
  max-width: 768px;
}

.ob-container-lg {
  max-width: 1024px;
}

.ob-container-xl {
  max-width: 1280px;
}

.ob-container-2xl {
  max-width: 1536px;
}

.ob-container-fluid {
  max-width: none;
}
</style>
