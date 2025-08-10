<template>
  <div
    :class="[
      'ob-stack',
      `ob-stack-${direction}`,
      themeClasses,
      customClasses
    ]"
    :style="stackStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObStack',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Stack direction
     */
    direction: {
      type: String,
      default: 'vertical',
      validator: (value: string) => ['vertical', 'horizontal'].includes(value),
    },
    
    /**
     * Spacing between stack items (in rem)
     */
    spacing: {
      type: Number,
      default: 1,
    },
    
    /**
     * Alignment of stack items
     */
    align: {
      type: String,
      default: '',
      validator: (value: string) => [
        '',
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'baseline',
      ].includes(value),
    },
    
    /**
     * Justification of stack items
     */
    justify: {
      type: String,
      default: '',
      validator: (value: string) => [
        '',
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ].includes(value),
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
     * Computed stack style based on props
     */
    const stackStyle = computed(() => {
      const style: Record<string, string> = {
        '--stack-spacing': `${props.spacing}rem`,
      };
      
      if (props.align) {
        style['align-items'] = props.align;
      }
      
      if (props.justify) {
        style['justify-content'] = props.justify;
      }
      
      return style;
    });
    
    return {
      stackStyle,
    };
  },
});
</script>

<style>
.ob-stack {
  display: flex;
}

.ob-stack-vertical {
  flex-direction: column;
}

.ob-stack-horizontal {
  flex-direction: row;
}

/* Add spacing between stack items */
.ob-stack-vertical > * + * {
  margin-top: var(--stack-spacing);
}

.ob-stack-horizontal > * + * {
  margin-left: var(--stack-spacing);
}
</style>
