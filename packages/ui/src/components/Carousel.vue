<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { computed } from 'vue'

export interface CarouselProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Carousel orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Whether the carousel should auto-play
   */
  autoPlay?: boolean
  
  /**
   * Auto-play interval in milliseconds
   */
  autoPlayInterval?: number
  
  /**
   * Whether to show loop (infinite scroll)
   */
  loop?: boolean
  
  /**
   * Number of slides to show at once
   */
  slidesPerView?: number
  
  /**
   * Spacing between slides
   */
  spacing?: string
  
  /**
   * Carousel variant (semantic for theme system)
   */
  variant?: 'default' | 'contained' | 'minimal'
  
  /**
   * Carousel size (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CarouselProps>(), {
  themeClasses: '',
  orientation: 'horizontal',
  autoPlay: false,
  autoPlayInterval: 3000,
  loop: false,
  slidesPerView: 1,
  spacing: '0px',
  variant: 'default',
  size: 'md',
  customClasses: ''
})

const emit = defineEmits<{
  'slide-change': [details: { index: number }]
}>()

/**
 * Generate carousel classes for theme system
 */
const carouselClasses = computed(() => {
  const classes = ['oi-carousel']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-carousel--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-carousel--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-carousel--${props.orientation}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle slide changes
 */
const handleSlideChange = (details: { index: number }) => {
  emit('slide-change', details)
}
</script>

<template>
  <Carousel.Root
    :class="carouselClasses"
    :orientation="orientation"
    :loop="loop"
    :slides-per-view="slidesPerView"
    :spacing="spacing"
    @slide-change="handleSlideChange"
  >
    <Carousel.Viewport class="oi-carousel-viewport">
      <Carousel.ItemGroup class="oi-carousel-item-group">
        <slot />
      </Carousel.ItemGroup>
    </Carousel.Viewport>
    
    <Carousel.Control class="oi-carousel-controls">
      <Carousel.PrevTrigger class="oi-carousel-prev">
        <slot name="prev-button">
          <span class="oi-carousel-prev-icon">‹</span>
        </slot>
      </Carousel.PrevTrigger>
      
      <Carousel.NextTrigger class="oi-carousel-next">
        <slot name="next-button">
          <span class="oi-carousel-next-icon">›</span>
        </slot>
      </Carousel.NextTrigger>
    </Carousel.Control>
    
    <Carousel.IndicatorGroup class="oi-carousel-indicators">
      <slot name="indicators" />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>


