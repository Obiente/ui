<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'
import { computed } from 'vue'

export interface PaginationProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Current page
   */
  page?: number
  
  /**
   * Total number of pages
   */
  count?: number
  
  /**
   * Number of sibling pages
   */
  siblingCount?: number
  
  /**
   * Items per page
   */
  pageSize?: number
  
  /**
   * Show first/last buttons
   */
  showFirstLast?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'outlined' | 'ghost'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  themeClasses: '',
  page: 1,
  count: 1,
  siblingCount: 1,
  pageSize: 10,
  showFirstLast: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:page': [page: number]
  'page-change': [details: { page: number; pageSize: number }]
  'page-size-change': [details: { pageSize: number }]
}>()

/**
 * Generate pagination classes for theme system
 */
const paginationClasses = computed(() => {
  const classes = ['oi-pagination']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-pagination--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-pagination--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle page change
 */
const handlePageChange = (details: { page: number; pageSize: number }) => {
  emit('update:page', details.page)
  emit('page-change', details)
}

/**
 * Handle page size change
 */
const handlePageSizeChange = (details: { pageSize: number }) => {
  emit('page-size-change', details)
}
</script>

<template>
  <Pagination.Root
    :class="paginationClasses"
    :page="page"
    :count="count"
    :sibling-count="siblingCount"
    :page-size="pageSize"
    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
  >
    <Pagination.Context>
      <template #default="{ pages, previousPage, nextPage }">
        <div class="oi-pagination-list">
          <Pagination.PrevTrigger 
            v-if="showFirstLast && page > 1"
            class="oi-pagination-item oi-pagination-prev"
          >
            <slot name="prevIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-pagination-icon">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </slot>
          </Pagination.PrevTrigger>
          
          <Pagination.Item
            v-for="page in pages"
            :key="page.value"
            :value="page.value"
            :class="{
              'oi-pagination-item': true,
              'oi-pagination-ellipsis': page.type === 'ellipsis'
            }"
          >
            <span v-if="page.type === 'ellipsis'" class="oi-pagination-ellipsis-text">
              <slot name="ellipsis">...</slot>
            </span>
            <span v-else class="oi-pagination-page-text">
              {{ page.value }}
            </span>
          </Pagination.Item>
          
          <Pagination.NextTrigger
            v-if="showFirstLast && page < count"
            class="oi-pagination-item oi-pagination-next"
          >
            <slot name="nextIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-pagination-icon">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </slot>
          </Pagination.NextTrigger>
        </div>
        
        <div v-if="$slots.info" class="oi-pagination-info">
          <slot name="info" :page="page" :count="count" :pageSize="pageSize" />
        </div>
      </template>
    </Pagination.Context>
  </Pagination.Root>
</template>


