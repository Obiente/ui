<template>
  <div
    :class="['ob-grid', themeClasses, customClasses]"
    :style="gridStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObGrid',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Number of columns in the grid
     * Can be a number or an object with breakpoints
     */
    columns: {
      type: [Number, Object],
      default: 1,
    },
    
    /**
     * Gap between grid items
     * Can be a number (in rem) or an object with breakpoints
     */
    gap: {
      type: [Number, Object],
      default: 0,
    },
    
    /**
     * Row gap between grid items
     * Can be a number (in rem) or an object with breakpoints
     */
    rowGap: {
      type: [Number, Object],
      default: null,
    },
    
    /**
     * Column gap between grid items
     * Can be a number (in rem) or an object with breakpoints
     */
    colGap: {
      type: [Number, Object],
      default: null,
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
     * Parse columns prop into CSS grid-template-columns
     */
    const parseColumns = (cols: number | Record<string, number>) => {
      if (typeof cols === 'number') {
        return `repeat(${cols}, minmax(0, 1fr))`;
      } else if (typeof cols === 'object' && cols !== null) {
        // For responsive objects, this would be handled via CSS media queries
        // But for simplicity, we'll just use the default value here
        return `repeat(${cols.default || 1}, minmax(0, 1fr))`;
      }
      return `repeat(1, minmax(0, 1fr))`;
    };
    
    /**
     * Parse gap prop into CSS value
     */
    const parseGap = (gap: number | Record<string, number> | null) => {
      if (gap === null) return null;
      if (typeof gap === 'number') {
        return `${gap}rem`;
      } else if (typeof gap === 'object' && gap !== null) {
        // For responsive objects, this would be handled via CSS media queries
        // But for simplicity, we'll just use the default value here
        return gap.default ? `${gap.default}rem` : null;
      }
      return null;
    };
    
    /**
     * Computed grid style based on props
     */
    const gridStyle = computed(() => {
      const style: Record<string, string> = {};
      
      style['grid-template-columns'] = parseColumns(props.columns);
      
      const gap = parseGap(props.gap);
      const rowGap = parseGap(props.rowGap);
      const colGap = parseGap(props.colGap);
      
      if (gap) {
        style['gap'] = gap;
      }
      
      if (rowGap) {
        style['row-gap'] = rowGap;
      }
      
      if (colGap) {
        style['column-gap'] = colGap;
      }
      
      return style;
    });
    
    return {
      gridStyle,
    };
  },
});
</script>

<style>
.ob-grid {
  display: grid;
}
</style>
