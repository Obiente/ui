<script setup lang="ts">
import { DatePicker } from '@ark-ui/vue/date-picker'
import { computed } from 'vue'

export interface DatePickerProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Selected date value
   */
  value?: Date | null
  
  /**
   * Minimum selectable date
   */
  min?: Date
  
  /**
   * Maximum selectable date
   */
  max?: Date
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Read-only state
   */
  readOnly?: boolean
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Date format for display
   */
  format?: string
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'filled' | 'outlined'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  themeClasses: '',
  value: null,
  disabled: false,
  readOnly: false,
  placeholder: 'Select a date',
  format: 'yyyy/MM/dd',
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'update:value': [value: Date | null]
  change: [value: Date | null]
  focus: []
  blur: []
}>()

/**
 * Generate datepicker classes for theme system
 */
const datePickerClasses = computed(() => {
  const classes = ['oi-datepicker']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-datepicker--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-datepicker--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-datepicker--disabled')
  }
  
  if (props.readOnly) {
    classes.push('oi-datepicker--readonly')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle value change
 */
const handleValueChange = (details: any) => {
  const date = details.value ? new Date(details.value) : null
  emit('update:value', date)
  emit('change', date)
}
</script>

<template>
  <DatePicker.Root
    :class="datePickerClasses"
    :value="value ? [value.toISOString().split('T')[0]] : []"
    :min="min?.toISOString().split('T')[0]"
    :max="max?.toISOString().split('T')[0]"
    :disabled="disabled"
    :readOnly="readOnly"
    :format="format"
    @value-change="handleValueChange"
  >
    <DatePicker.Label v-if="$slots.label" class="oi-datepicker-label">
      <slot name="label" />
    </DatePicker.Label>
    
    <DatePicker.Control class="oi-datepicker-control">
      <DatePicker.Input
        class="oi-datepicker-input"
        :placeholder="placeholder"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
      <DatePicker.Trigger class="oi-datepicker-trigger">
        <slot name="trigger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-datepicker-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </slot>
      </DatePicker.Trigger>
    </DatePicker.Control>
    
    <DatePicker.Positioner>
      <DatePicker.Content class="oi-datepicker-content">
        <DatePicker.View view="day" class="oi-datepicker-view">
          <DatePicker.Context>
            <template #default="{ view }">
              <DatePicker.ViewControl class="oi-datepicker-view-control">
                <DatePicker.PrevTrigger class="oi-datepicker-prev">
                  <slot name="prevIcon">‹</slot>
                </DatePicker.PrevTrigger>
                
                <DatePicker.ViewTrigger class="oi-datepicker-view-trigger">
                  {{ view.label }}
                </DatePicker.ViewTrigger>
                
                <DatePicker.NextTrigger class="oi-datepicker-next">
                  <slot name="nextIcon">›</slot>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              
              <DatePicker.Table class="oi-datepicker-table">
                <DatePicker.TableHead class="oi-datepicker-table-head">
                  <DatePicker.TableRow class="oi-datepicker-table-row">
                    <DatePicker.TableHeader
                      v-for="day in view.weekDays"
                      :key="day.value"
                      class="oi-datepicker-table-header"
                    >
                      {{ day.short }}
                    </DatePicker.TableHeader>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                
                <DatePicker.TableBody class="oi-datepicker-table-body">
                  <DatePicker.TableRow
                    v-for="week in view.weeks"
                    :key="week[0].value"
                    class="oi-datepicker-table-row"
                  >
                    <DatePicker.TableCell
                      v-for="day in week"
                      :key="day.value"
                      :value="day.value"
                      class="oi-datepicker-table-cell"
                    >
                      <DatePicker.TableCellTrigger class="oi-datepicker-table-cell-trigger">
                        {{ day.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </template>
          </DatePicker.Context>
        </DatePicker.View>
        
        <DatePicker.View view="month" class="oi-datepicker-view">
          <DatePicker.Context>
            <template #default="{ view }">
              <DatePicker.ViewControl class="oi-datepicker-view-control">
                <DatePicker.PrevTrigger class="oi-datepicker-prev">
                  <slot name="prevIcon">‹</slot>
                </DatePicker.PrevTrigger>
                
                <DatePicker.ViewTrigger class="oi-datepicker-view-trigger">
                  {{ view.label }}
                </DatePicker.ViewTrigger>
                
                <DatePicker.NextTrigger class="oi-datepicker-next">
                  <slot name="nextIcon">›</slot>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              
              <DatePicker.Table class="oi-datepicker-table">
                <DatePicker.TableBody class="oi-datepicker-table-body">
                  <DatePicker.TableRow
                    v-for="row in view.months"
                    :key="row[0].value"
                    class="oi-datepicker-table-row"
                  >
                    <DatePicker.TableCell
                      v-for="month in row"
                      :key="month.value"
                      :value="month.value"
                      class="oi-datepicker-table-cell"
                    >
                      <DatePicker.TableCellTrigger class="oi-datepicker-table-cell-trigger">
                        {{ month.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </template>
          </DatePicker.Context>
        </DatePicker.View>
        
        <DatePicker.View view="year" class="oi-datepicker-view">
          <DatePicker.Context>
            <template #default="{ view }">
              <DatePicker.ViewControl class="oi-datepicker-view-control">
                <DatePicker.PrevTrigger class="oi-datepicker-prev">
                  <slot name="prevIcon">‹</slot>
                </DatePicker.PrevTrigger>
                
                <DatePicker.ViewTrigger class="oi-datepicker-view-trigger">
                  {{ view.label }}
                </DatePicker.ViewTrigger>
                
                <DatePicker.NextTrigger class="oi-datepicker-next">
                  <slot name="nextIcon">›</slot>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              
              <DatePicker.Table class="oi-datepicker-table">
                <DatePicker.TableBody class="oi-datepicker-table-body">
                  <DatePicker.TableRow
                    v-for="row in view.years"
                    :key="row[0].value"
                    class="oi-datepicker-table-row"
                  >
                    <DatePicker.TableCell
                      v-for="year in row"
                      :key="year.value"
                      :value="year.value"
                      class="oi-datepicker-table-cell"
                    >
                      <DatePicker.TableCellTrigger class="oi-datepicker-table-cell-trigger">
                        {{ year.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </template>
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
</template>


