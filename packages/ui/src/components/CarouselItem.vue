<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { computed } from 'vue'

export interface CarouselItemProps {
  /**
   * Index of this carousel item
   */
  index: number
  
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CarouselItemProps>(), {
  themeClasses: '',
  customClasses: ''
})

/**
 * Generate carousel item classes for theme system
 */
const itemClasses = computed(() => {
  const classes = ['oi-carousel-item']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Carousel.Item
    :class="itemClasses"
    :index="index"
  >
    <slot />
  </Carousel.Item>
</template>


