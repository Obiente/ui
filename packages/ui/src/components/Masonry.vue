<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

export interface MasonryProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Number of columns
   */
  columns?: number
  
  /**
   * Gap between items
   */
  gap?: string | number
  
  /**
   * Responsive column configuration
   */
  responsiveColumns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  
  /**
   * Breakpoints for responsive columns
   */
  breakpoints?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  
  /**
   * Items to render
   */
  items?: any[]
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'fluid' | 'fixed' | 'compact'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<MasonryProps>(), {
  themeClasses: '',
  columns: 3,
  gap: '16px',
  responsiveColumns: () => ({}),
  breakpoints: () => ({
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }),
  items: () => [],
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  resize: [columns: number]
  'item-click': [item: any, index: number]
}>()

const masonryRef = ref<HTMLElement>()
const currentColumns = ref(props.columns)
const columnHeights = ref<number[]>([])

/**
 * Generate masonry classes for theme system
 */
const masonryClasses = computed(() => {
  const classes = ['oi-masonry']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-masonry--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-masonry--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Generate masonry styles
 */
const masonryStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  const gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  styles.gap = gap
  
  return styles
})

/**
 * Get current number of columns based on screen size
 */
const getResponsiveColumns = () => {
  if (!masonryRef.value) return props.columns
  
  const width = masonryRef.value.offsetWidth
  const { responsiveColumns, breakpoints } = props
  
  if (width >= breakpoints.xl! && responsiveColumns.xl) return responsiveColumns.xl
  if (width >= breakpoints.lg! && responsiveColumns.lg) return responsiveColumns.lg
  if (width >= breakpoints.md! && responsiveColumns.md) return responsiveColumns.md
  if (width >= breakpoints.sm! && responsiveColumns.sm) return responsiveColumns.sm
  if (width >= breakpoints.xs! && responsiveColumns.xs) return responsiveColumns.xs
  
  return props.columns
}

/**
 * Initialize column heights
 */
const initializeColumns = () => {
  const cols = getResponsiveColumns()
  currentColumns.value = cols
  columnHeights.value = new Array(cols).fill(0)
  emit('resize', cols)
}

/**
 * Get the shortest column index
 */
const getShortestColumnIndex = () => {
  let shortestIndex = 0
  let shortestHeight = columnHeights.value[0]
  
  for (let i = 1; i < columnHeights.value.length; i++) {
    if (columnHeights.value[i] < shortestHeight) {
      shortestHeight = columnHeights.value[i]
      shortestIndex = i
    }
  }
  
  return shortestIndex
}

/**
 * Position items in masonry layout
 */
const positionItems = async () => {
  if (!masonryRef.value) return
  
  await nextTick()
  
  const items = masonryRef.value.querySelectorAll('.oi-masonry-item')
  const gap = parseInt(getComputedStyle(masonryRef.value).gap) || 16
  const columnWidth = (masonryRef.value.offsetWidth - gap * (currentColumns.value - 1)) / currentColumns.value
  
  // Reset column heights
  columnHeights.value = new Array(currentColumns.value).fill(0)
  
  items.forEach((item, index) => {
    const element = item as HTMLElement
    const shortestColumnIndex = getShortestColumnIndex()
    
    // Position the item
    element.style.position = 'absolute'
    element.style.width = `${columnWidth}px`
    element.style.left = `${shortestColumnIndex * (columnWidth + gap)}px`
    element.style.top = `${columnHeights.value[shortestColumnIndex]}px`
    
    // Update column height
    columnHeights.value[shortestColumnIndex] += element.offsetHeight + gap
  })
  
  // Set container height
  const maxHeight = Math.max(...columnHeights.value)
  masonryRef.value.style.height = `${maxHeight}px`
}

/**
 * Handle window resize
 */
const handleResize = () => {
  const newColumns = getResponsiveColumns()
  if (newColumns !== currentColumns.value) {
    initializeColumns()
    positionItems()
  }
}

/**
 * Handle item click
 */
const handleItemClick = (item: any, index: number) => {
  emit('item-click', item, index)
}

// Lifecycle
onMounted(() => {
  initializeColumns()
  positionItems()
  
  window.addEventListener('resize', handleResize)
  
  // Observe item load events for images
  const observer = new MutationObserver(() => {
    positionItems()
  })
  
  if (masonryRef.value) {
    observer.observe(masonryRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Watch for items changes
import { watch } from 'vue'
watch(() => props.items, () => {
  nextTick(() => {
    positionItems()
  })
}, { deep: true })

// Expose methods
defineExpose({
  refresh: positionItems,
  resize: handleResize
})
</script>

<template>
  <div 
    ref="masonryRef"
    :class="masonryClasses"
    :style="masonryStyles"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="oi-masonry-item"
      @click="handleItemClick(item, index)"
    >
      <slot name="item" :item="item" :index="index">
        {{ item }}
      </slot>
    </div>
    
    <!-- Default slot for custom content -->
    <slot />
  </div>
</template>


