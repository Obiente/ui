<template>
  <div
    :class="['ob-flex', themeClasses, customClasses]"
    :style="flexStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ObFlex',
  
  props: {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses: {
      type: String,
      default: '',
    },
    
    /**
     * Flex direction
     */
    direction: {
      type: String,
      default: 'row',
      validator: (value: string) => ['row', 'row-reverse', 'column', 'column-reverse'].includes(value),
    },
    
    /**
     * Flex wrap
     */
    wrap: {
      type: String,
      default: 'nowrap',
      validator: (value: string) => ['nowrap', 'wrap', 'wrap-reverse'].includes(value),
    },
    
    /**
     * Justify content
     */
    justify: {
      type: String,
      default: 'flex-start',
      validator: (value: string) => [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
        'start',
        'end',
        'left',
        'right',
      ].includes(value),
    },
    
    /**
     * Align items
     */
    align: {
      type: String,
      default: 'stretch',
      validator: (value: string) => [
        'stretch',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'start',
        'end',
        'self-start',
        'self-end',
      ].includes(value),
    },
    
    /**
     * Gap between flex items
     * Can be a number (in rem) or an object with x, y values
     */
    gap: {
      type: [Number, Object],
      default: 0,
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
     * Parse gap prop into CSS value
     */
    const parseGap = (gap: number | Record<string, number>) => {
      if (typeof gap === 'number') {
        return `${gap}rem`;
      } else if (typeof gap === 'object' && gap !== null) {
        // For gap as an object with x, y values
        const x = gap.x !== undefined ? `${gap.x}rem` : '0';
        const y = gap.y !== undefined ? `${gap.y}rem` : '0';
        return `${y} ${x}`;
      }
      return '0';
    };
    
    /**
     * Computed flex style based on props
     */
    const flexStyle = computed(() => {
      return {
        'flex-direction': props.direction,
        'flex-wrap': props.wrap,
        'justify-content': props.justify,
        'align-items': props.align,
        'gap': parseGap(props.gap),
      };
    });
    
    return {
      flexStyle,
    };
  },
});
</script>

<style>
.ob-flex {
  display: flex;
}
</style>
