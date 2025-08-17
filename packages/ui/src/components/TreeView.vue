<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/collection'
import { computed } from 'vue'

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  disabled?: boolean
  expandable?: boolean
}

export interface TreeViewProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Tree data
   */
  collection?: TreeNode[]
  
  /**
   * Selected node IDs
   */
  selectedValue?: string[]
  
  /**
   * Expanded node IDs
   */
  expandedValue?: string[]
  
  /**
   * Multiple selection
   */
  multiple?: boolean
  
  /**
   * Selection mode
   */
  selectionMode?: 'single' | 'multiple'
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'ghost'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<TreeViewProps>(), {
  themeClasses: '',
  collection: () => [],
  selectedValue: () => [],
  expandedValue: () => [],
  multiple: false,
  selectionMode: 'single',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:selectedValue': [value: string[]]
  'update:expandedValue': [value: string[]]
  'selection-change': [details: { selectedValue: string[] }]
  'expanded-change': [details: { expandedValue: string[] }]
  'focus-change': [details: { focusedValue: string | null }]
}>()

/**
 * Generate tree view classes for theme system
 */
const treeViewClasses = computed(() => {
  const classes = ['oi-tree-view']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-tree-view--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-tree-view--${props.size}`)
  
  if (props.multiple) {
    classes.push('oi-tree-view--multiple')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Convert TreeNode array to TreeCollection
 */
const treeCollection = computed(() => {
  if (!props.collection || props.collection.length === 0) {
    return createTreeCollection({ rootNode: { id: 'root', label: 'Root', children: [] } }) as any
  }
  
  // Convert our TreeNode format to Ark UI format
  const convertNode = (node: any): any => ({
    id: node.id,
    label: node.label,
    children: node.children?.map(convertNode) || [],
    disabled: node.disabled || false
  })
  
  // Create a root node containing all top-level nodes
  const rootNode = {
    id: 'root',
    label: 'Root',
    children: props.collection.map(convertNode)
  }
  
  return createTreeCollection({ rootNode }) as any
})

/**
 * Handle selection change
 */
const handleSelectionChange = (details: { selectedValue: string[] }) => {
  emit('update:selectedValue', details.selectedValue)
  emit('selection-change', details)
}

/**
 * Handle expanded change
 */
const handleExpandedChange = (details: { expandedValue: string[] }) => {
  emit('update:expandedValue', details.expandedValue)
  emit('expanded-change', details)
}

/**
 * Handle focus change
 */
const handleFocusChange = (details: { focusedValue: string | null }) => {
  emit('focus-change', details)
}
</script>

<template>
  <TreeView.Root
    :class="treeViewClasses"
    :collection="treeCollection"
    :selected-value="selectedValue"
    :expanded-value="expandedValue"
    :selection-mode="selectionMode"
    @selection-change="handleSelectionChange"
    @expanded-change="handleExpandedChange"
    @focus-change="handleFocusChange"
  >
    <TreeView.Label v-if="$slots.label" class="oi-tree-view-label">
      <slot name="label" />
    </TreeView.Label>
    
    <TreeView.Tree class="oi-tree-view-tree">
      <TreeView.Context>
        <template #default="api">
          <TreeView.Branch
            v-for="node in api.collection"
            :key="(node as any).id"
            :node="node"
            class="oi-tree-view-branch"
          >
            <TreeView.BranchContent class="oi-tree-view-branch-content">
              <TreeView.BranchControl class="oi-tree-view-branch-control">
                <TreeView.BranchTrigger class="oi-tree-view-branch-trigger">
                  <TreeView.BranchIndicator class="oi-tree-view-branch-indicator">
                    <slot name="expandIcon" :node="node">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-tree-view-expand-icon">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </slot>
                  </TreeView.BranchIndicator>
                </TreeView.BranchTrigger>
                
                <TreeView.BranchText class="oi-tree-view-branch-text">
                  <slot name="branchContent" :node="node">
                    {{ (node as any).label }}
                  </slot>
                </TreeView.BranchText>
              </TreeView.BranchControl>
              
              <TreeView.BranchContent class="oi-tree-view-branch-children">
                <TreeView.Item
                  v-for="child in (node as any).children || []"
                  :key="child.id"
                  :node="child"
                  class="oi-tree-view-item"
                >
                  <TreeView.ItemIndicator v-if="multiple" class="oi-tree-view-item-indicator">
                    <slot name="selectionIcon" :node="child">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-tree-view-selection-icon">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </slot>
                  </TreeView.ItemIndicator>
                  
                  <TreeView.ItemText class="oi-tree-view-item-text">
                    <slot name="itemContent" :node="child">
                      {{ child.label }}
                    </slot>
                  </TreeView.ItemText>
                </TreeView.Item>
              </TreeView.BranchContent>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </template>
      </TreeView.Context>
    </TreeView.Tree>
  </TreeView.Root>
</template>


