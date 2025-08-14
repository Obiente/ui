<script setup lang="ts">
import { Combobox } from '@ark-ui/vue/combobox'
import { computed } from 'vue'

export interface CommandItem {
  value: string
  label: string
  description?: string
  group?: string
  disabled?: boolean
  keywords?: string[]
}

export interface CommandProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected value
   */
  value?: string
  
  /**
   * Input value for filtering
   */
  inputValue?: string
  
  /**
   * Available command items
   */
  items?: CommandItem[]
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Empty state text
   */
  emptyText?: string
  
  /**
   * Open state
   */
  open?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CommandProps>(), {
  themeClasses: '',
  value: '',
  inputValue: '',
  items: () => [],
  placeholder: 'Type a command or search...',
  emptyText: 'No results found.',
  open: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: string]
  'update:inputValue': [inputValue: string]
  'update:open': [open: boolean]
  'value-change': [details: { value: string }]
  'input-value-change': [details: { inputValue: string }]
  'open-change': [details: { open: boolean }]
  select: [item: CommandItem]
}>()

/**
 * Generate command classes for theme system
 */
const commandClasses = computed(() => {
  const classes = ['oi-command']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-command--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-command--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Filter items based on input value
 */
const filteredItems = computed(() => {
  if (!props.inputValue) return props.items
  
  const query = props.inputValue.toLowerCase()
  return props.items.filter(item => {
    const matchesLabel = item.label.toLowerCase().includes(query)
    const matchesDescription = item.description?.toLowerCase().includes(query)
    const matchesKeywords = item.keywords?.some(keyword => keyword.toLowerCase().includes(query))
    
    return matchesLabel || matchesDescription || matchesKeywords
  })
})

/**
 * Group filtered items
 */
const groupedItems = computed(() => {
  const groups: Record<string, CommandItem[]> = {}
  
  filteredItems.value.forEach(item => {
    const group = item.group || 'Commands'
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(item)
  })
  
  return groups
})

/**
 * Handle value change
 */
const handleValueChange = (details: { value: string }) => {
  emit('update:value', details.value)
  emit('value-change', details)
  
  const selectedItem = props.items.find(item => item.value === details.value)
  if (selectedItem) {
    emit('select', selectedItem)
  }
}

/**
 * Handle input value change
 */
const handleInputValueChange = (details: { inputValue: string }) => {
  emit('update:inputValue', details.inputValue)
  emit('input-value-change', details)
}

/**
 * Handle open change
 */
const handleOpenChange = (details: { open: boolean }) => {
  emit('update:open', details.open)
  emit('open-change', details)
}
</script>

<template>
  <Combobox.Root
    :class="commandClasses"
    :value="value ? [value] : []"
    :input-value="inputValue"
    :items="filteredItems"
    :open="open"
    @value-change="handleValueChange"
    @input-value-change="handleInputValueChange"
    @open-change="handleOpenChange"
  >
    <Combobox.Control class="oi-command-control">
      <div class="oi-command-input-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-command-search-icon">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        
        <Combobox.Input
          class="oi-command-input"
          :placeholder="placeholder"
        />
      </div>
    </Combobox.Control>
    
    <Combobox.Positioner>
      <Combobox.Content class="oi-command-content">
        <template v-if="Object.keys(groupedItems).length > 0">
          <div
            v-for="(items, groupName) in groupedItems"
            :key="groupName"
            class="oi-command-group"
          >
            <div v-if="groupName !== 'Commands'" class="oi-command-group-heading">
              {{ groupName }}
            </div>
            
            <Combobox.ItemGroup class="oi-command-item-group">
              <Combobox.Item
                v-for="item in items"
                :key="item.value"
                :item="item"
                :disabled="item.disabled"
                class="oi-command-item"
              >
                <div class="oi-command-item-content">
                  <Combobox.ItemText class="oi-command-item-text">
                    {{ item.label }}
                  </Combobox.ItemText>
                  
                  <div v-if="item.description" class="oi-command-item-description">
                    {{ item.description }}
                  </div>
                </div>
                
                <Combobox.ItemIndicator class="oi-command-item-indicator">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-command-check-icon">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </Combobox.ItemIndicator>
              </Combobox.Item>
            </Combobox.ItemGroup>
          </div>
        </template>
        
        <div v-else class="oi-command-empty">
          {{ emptyText }}
        </div>
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
</template>


