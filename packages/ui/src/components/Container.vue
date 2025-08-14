<template>
  <div :class="[
    'oi-bg-background',
    'oi-rounded-lg',
    paddingClasses,
    maxWidthClasses,
    centered ? 'oi-ml-auto oi-mr-auto' : '',
    $attrs.class
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ 
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centered?: boolean
}>(), {
  padding: 'md',
  maxWidth: 'full',
  centered: false
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return ''
    case 'sm':
      return 'oi-p-2'
    case 'lg':
      return 'oi-p-6'
    case 'xl':
      return 'oi-p-8'
    default:
      return 'oi-p-4'
  }
})

const maxWidthClasses = computed(() => {
  switch (props.maxWidth) {
    case 'sm':
      return 'oi-max-w-sm'
    case 'md':
      return 'oi-max-w-md'
    case 'lg':
      return 'oi-max-w-lg'
    case 'xl':
      return 'oi-max-w-xl'
    case '2xl':
      return 'oi-max-w-2xl'
    default:
      return 'oi-w-full'
  }
})
</script>
