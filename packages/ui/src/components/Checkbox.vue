<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox } from '@ark-ui/vue'

const props = withDefaults(defineProps<{ 
  checked?: boolean
  error?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  label?: string
  helpText?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const emit = defineEmits<{
  checkedChange: [checked: boolean]
}>()

const handleCheckedChange = (details: { checked: string | boolean }) => {
  const isChecked = details.checked === true || details.checked === 'true'
  emit('checkedChange', isChecked)
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'oi-w-3 oi-h-3'
    case 'lg':
      return 'oi-w-5 oi-h-5'
    default:
      return 'oi-w-4 oi-h-4'
  }
})

const indicatorSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'oi-w-2 oi-h-2'
    case 'lg':
      return 'oi-w-4 oi-h-4'
    default:
      return 'oi-w-3 oi-h-3'
  }
})

const stateClasses = computed(() => {
  if (props.error) {
    return 'oi-border-error data-[state=checked]:oi-bg-error data-[state=checked]:oi-border-error'
  }
  return 'oi-border-muted data-[state=checked]:oi-bg-primary data-[state=checked]:oi-border-primary'
})
</script>

<template>
  <Checkbox.Root
    v-bind="$attrs"
    :checked="checked"
    :disabled="disabled"
    :invalid="error"
    :name="name"
    :value="value"
    :class="[
      'oi-flex oi-items-center oi-gap-2',
      disabled ? 'oi-opacity-50 oi-cursor-not-allowed' : 'oi-cursor-pointer',
      $attrs.class
    ]"
    @checked-change="handleCheckedChange"
  >
    <Checkbox.Control
      :class="[
        'oi-flex oi-items-center oi-justify-center',
        'oi-w-4 oi-h-4',
        'oi-rounded-sm',
        'oi-border-2',
        'oi-transition-all',
        'oi-focus-ring',
        'oi-bg-surface',
        sizeClasses,
        stateClasses
      ]"
    >
      <Checkbox.Indicator
        class="oi-text-background oi-transition-all"
        :class="indicatorSizeClasses"
      >
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          class="oi-w-full oi-h-full"
        >
          <path
            fill-rule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            clip-rule="evenodd"
          />
        </svg>
      </Checkbox.Indicator>
    </Checkbox.Control>

    <Checkbox.Label
      v-if="label"
      :class="[
        'oi-text-sm oi-font-medium oi-cursor-pointer',
        error ? 'oi-text-error' : 'oi-text-foreground',
        disabled ? 'oi-cursor-not-allowed' : ''
      ]"
    >
      {{ label }}
      <span v-if="required" class="oi-text-error" aria-label="required">*</span>
    </Checkbox.Label>

    <!-- Hidden input for form submission -->
    <Checkbox.HiddenInput />
  </Checkbox.Root>

  <!-- Help text -->
  <p
    v-if="helpText && !error"
    class="oi-mt-1 oi-text-xs oi-text-muted oi-ml-6"
  >
    {{ helpText }}
  </p>

  <!-- Error message -->
  <p
    v-if="error && errorMessage"
    class="oi-mt-1 oi-text-xs oi-text-error oi-ml-6"
    role="alert"
    aria-live="polite"
  >
    {{ errorMessage }}
  </p>
</template>


