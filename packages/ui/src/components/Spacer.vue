<template>
  <div
    :class="['ob-spacer', themeClasses, customClasses]"
    :style="spacerStyle"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObSpacer',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Width of the spacer
     * Can be a number (in rem) or a string CSS value
     */
    width: {
      type: [Number, String],
      default: undefined,
    },
    
    /**
     * Height of the spacer
     * Can be a number (in rem) or a string CSS value
     */
    height: {
      type: [Number, String],
      default: undefined,
    },
    
    /**
     * Both width and height of the spacer
     * Can be a number (in rem) or a string CSS value
     */
    size: {
      type: [Number, String],
      default: undefined,
    },
    
    /**
     * Whether the spacer should grow to fill available space
     */
    grow: {
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
     * Parse size value into CSS
     */
    const parseSize = (value: number | string | undefined) => {
      if (value === undefined) return undefined;
      if (typeof value === 'number') return `${value}rem`;
      return value;
    };
    
    /**
     * Computed spacer style based on props
     */
    const spacerStyle = computed(() => {
      const style: Record<string, string | undefined> = {};
      
      // Apply size to both width and height if set
      if (props.size !== undefined) {
        const size = parseSize(props.size);
        style.width = size;
        style.height = size;
      }
      
      // Override with specific width/height if set
      if (props.width !== undefined) {
        style.width = parseSize(props.width);
      }
      
      if (props.height !== undefined) {
        style.height = parseSize(props.height);
      }
      
      // Apply flex-grow if set
      if (props.grow) {
        style.flexGrow = '1';
      }
      
      return style;
    });
    
    return {
      spacerStyle,
    };
  },
});
</script>

<style>
.ob-spacer {
  display: block;
}
</style>
