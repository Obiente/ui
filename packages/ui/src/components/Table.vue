<script setup lang="ts">
import { computed } from 'vue'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Table columns
   */
  columns?: TableColumn[]
  
  /**
   * Table data
   */
  data?: Record<string, any>[]
  
  /**
   * Striped rows
   */
  striped?: boolean
  
  /**
   * Hoverable rows
   */
  hover?: boolean
  
  /**
   * Bordered table
   */
  bordered?: boolean
  
  /**
   * Sticky header
   */
  stickyHeader?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'striped'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  themeClasses: '',
  columns: () => [],
  data: () => [],
  striped: false,
  hover: false,
  bordered: false,
  stickyHeader: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'row-click': [row: Record<string, any>, index: number]
  'column-sort': [column: TableColumn, direction: 'asc' | 'desc']
}>()

/**
 * Generate table classes for theme system
 */
const tableClasses = computed(() => {
  const classes = ['oi-table']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-table--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-table--${props.size}`)
  
  if (props.striped) {
    classes.push('oi-table--striped')
  }
  
  if (props.hover) {
    classes.push('oi-table--hover')
  }
  
  if (props.bordered) {
    classes.push('oi-table--bordered')
  }
  
  if (props.stickyHeader) {
    classes.push('oi-table--sticky-header')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle row click
 */
const handleRowClick = (row: Record<string, any>, index: number) => {
  emit('row-click', row, index)
}

/**
 * Handle column sort
 */
const handleColumnSort = (column: TableColumn, direction: 'asc' | 'desc') => {
  emit('column-sort', column, direction)
}
</script>

<template>
  <div class="oi-table-container">
    <table :class="tableClasses">
      <thead class="oi-table-header">
        <tr class="oi-table-header-row">
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width, textAlign: column.align || 'left' }"
            :class="{
              'oi-table-header-cell': true,
              'oi-table-header-cell--sortable': column.sortable
            }"
            @click="column.sortable && handleColumnSort(column, 'asc')"
          >
            <slot :name="`header-${column.key}`" :column="column">
              <div class="oi-table-header-content">
                <span class="oi-table-header-text">{{ column.label }}</span>
                <svg
                  v-if="column.sortable"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="oi-table-sort-icon"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </slot>
          </th>
        </tr>
      </thead>
      
      <tbody class="oi-table-body">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="oi-table-body-row"
          @click="handleRowClick(row, index)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align || 'left' }"
            class="oi-table-body-cell"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="index">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        
        <tr v-if="data.length === 0" class="oi-table-empty-row">
          <td :colspan="columns.length" class="oi-table-empty-cell">
            <slot name="empty">
              <div class="oi-table-empty-content">
                No data available
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
      
      <tfoot v-if="$slots.footer" class="oi-table-footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>


