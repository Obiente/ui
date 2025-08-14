<template>
  <div class="oi-relative">
    <!-- Label (if provided) -->
    <label
      v-if="label"
      :for="inputId"
      :class="[
        'oi-block oi-text-sm oi-font-medium oi-mb-1',
        error ? 'oi-text-error' : 'oi-text-foreground',
        disabled ? 'oi-opacity-50' : ''
      ]"
    >
      {{ label }}
      <span v-if="required" class="oi-text-error" aria-label="required">*</span>
    </label>

    <!-- Input wrapper for icons -->
    <div class="oi-relative">
      <!-- Leading icon -->
      <div
        v-if="$slots.leadingIcon"
        class="oi-absolute oi-left-3 oi-top-1/2 oi-transform oi--translate-y-1/2 oi-pointer-events-none"
        aria-hidden="true"
      >
        <slot name="leadingIcon" />
      </div>

      <!-- Input field -->
      <input
        :id="inputId"
        v-bind="$attrs"
        :class="[
          'oi-bg-surface',
          'oi-text-foreground',
          'oi-border',
          'oi-rounded-md',
          'oi-w-full',
          'oi-transition-colors',
          'oi-focus-ring',
          'oi-interactive',
          $slots.leadingIcon ? 'oi-pl-10' : '',
          $slots.trailingIcon ? 'oi-pr-10' : '',
          sizeClasses,
          stateClasses,
          disabled ? 'oi-disabled' : '',
          $attrs.class
        ]"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="ariaDescribedby"
        :placeholder="placeholder"
      />

      <!-- Trailing icon -->
      <div
        v-if="$slots.trailingIcon"
        class="oi-absolute oi-right-3 oi-top-1/2 oi-transform oi--translate-y-1/2 oi-pointer-events-none"
        aria-hidden="true"
      >
        <slot name="trailingIcon" />
      </div>
    </div>

    <!-- Help text -->
    <p
      v-if="helpText && !error"
      :id="`${inputId}-help`"
      class="oi-mt-1 oi-text-xs oi-text-muted"
    >
      {{ helpText }}
    </p>

    <!-- Error message -->
    <p
      v-if="error && errorMessage"
      :id="`${inputId}-error`"
      class="oi-mt-1 oi-text-xs oi-text-error"
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = defineProps<{ 
  error?: boolean
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  helpText?: string
  errorMessage?: string
  placeholder?: string
}>()

const inputId = useId()

const ariaDescribedby = computed(() => {
  const ids = []
  if (props.helpText && !props.error) {
    ids.push(`${inputId}-help`)
  }
  if (props.error && props.errorMessage) {
    ids.push(`${inputId}-error`)
  }
  return ids.length > 0 ? ids.join(' ') : undefined
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'oi-px-2 oi-py-1 oi-text-sm'
    case 'lg':
      return 'oi-px-4 oi-py-3 oi-text-lg'
    default:
      return 'oi-px-3 oi-py-2 oi-text-md'
  }
})

const stateClasses = computed(() => {
  if (props.error) {
    return 'oi-border-error oi-focus-ring-error oi-shadow-sm'
  }
  return 'oi-border-muted oi-shadow-sm'
})
</script>


