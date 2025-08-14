<script setup lang="ts">
import { computed } from 'vue'

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
  disabled?: boolean
}

export interface BreadcrumbProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Breadcrumb items
   */
  items?: BreadcrumbItem[]
  
  /**
   * Separator character or element
   */
  separator?: string
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'ghost' | 'underline' | 'pill'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  themeClasses: '',
  items: () => [],
  separator: '/',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'item-click': [item: BreadcrumbItem, index: number]
}>()

/**
 * Generate breadcrumb classes for theme system
 */
const breadcrumbClasses = computed(() => {
  const classes = ['oi-breadcrumb']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-breadcrumb--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-breadcrumb--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle item click
 */
const handleItemClick = (item: BreadcrumbItem, index: number) => {
  if (!item.disabled) {
    emit('item-click', item, index)
  }
}
</script>

<template>
  <nav 
    :class="breadcrumbClasses"
    aria-label="Breadcrumb"
  >
    <ol class="oi-breadcrumb-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="oi-breadcrumb-item"
      >
        <a
          v-if="item.href && !item.current"
          :href="item.href"
          :class="{
            'oi-breadcrumb-link': true,
            'oi-breadcrumb-link--disabled': item.disabled
          }"
          :aria-disabled="item.disabled"
          @click="handleItemClick(item, index)"
        >
          {{ item.label }}
        </a>
        
        <span
          v-else
          :class="{
            'oi-breadcrumb-current': item.current,
            'oi-breadcrumb-text': !item.current
          }"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        
        <span
          v-if="index < items.length - 1"
          class="oi-breadcrumb-separator"
          aria-hidden="true"
        >
          {{ separator }}
        </span>
      </li>
    </ol>
    
    <!-- Default slot for custom content -->
    <slot />
  </nav>
</template>


