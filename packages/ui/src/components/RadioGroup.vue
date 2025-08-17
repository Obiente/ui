<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
defineProps<{
  options: Array<{ label: string; value: string }>
  modelValue: string
  error?: boolean
  disabled?: boolean
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="oi-flex oi-flex-col oi-gap-2">
    <label
      v-for="option in options"
      :key="option.value"
      :class="['oi-flex', 'oi-items-center', 'oi-cursor-pointer']"
    >
      <input
        type="radio"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="emit('update:modelValue', option.value)"
        :class="[
          'oi-bg-surface',
          'oi-border',
          'oi-rounded-full',
          'oi-w-full',
          modelValue === option.value ? 'oi-bg-primary' : '',
          error ? 'oi-border-error' : '',
          disabled ? 'oi-opacity-50' : '',
        ]"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
      />
      <span class="oi-ml-2 oi-text-foreground">{{ option.label }}</span>
    </label>
  </div>
</template>
