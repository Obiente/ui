<script setup lang="ts">
import { computed } from 'vue'

export interface DataListItem {
  label: string
  value: string | number
  description?: string
}

export interface DataListProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Data items
   */
  items?: DataListItem[]
  
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'striped' | 'spaced'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<DataListProps>(), {
  themeClasses: '',
  items: () => [],
  orientation: 'vertical',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'item-click': [item: DataListItem, index: number]
}>()

/**
 * Generate data list classes for theme system
 */
const dataListClasses = computed(() => {
  const classes = ['oi-data-list']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-data-list--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-data-list--${props.size}`)
  
  // Add orientation class
  classes.push(`oi-data-list--${props.orientation}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle item click
 */
const handleItemClick = (item: DataListItem, index: number) => {
  emit('item-click', item, index)
}
</script>

<template>
  <div
    :class="dataListClasses"
    role="list"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="oi-data-list-item"
      role="listitem"
      @click="handleItemClick(item, index)"
    >
      <dt class="oi-data-list-item-label">
        {{ item.label }}
      </dt>
      
      <dd class="oi-data-list-item-value">
        {{ item.value }}
      </dd>
      
      <dd v-if="item.description" class="oi-data-list-item-description">
        {{ item.description }}
      </dd>
    </div>
    
    <!-- Default slot for custom content -->
    <slot />
  </div>
</template>


