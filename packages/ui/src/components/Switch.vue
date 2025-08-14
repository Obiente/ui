<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ checked?: boolean; error?: boolean; disabled?: boolean }>();
</script>

<template>
  <label :class="['oi-flex', 'oi-items-center', 'oi-cursor-pointer', disabled ? 'oi-opacity-50' : '']">
    <input
      type="checkbox"
      v-bind="$attrs"
      :class="[
        'oi-bg-surface',
        'oi-border',
        'oi-rounded-full',
        'oi-w-full',
        checked ? 'oi-bg-primary' : '',
        error ? 'oi-border-error' : '',
        disabled ? 'oi-opacity-50' : '',
        $attrs.class
      ]"
      :checked="checked"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
    />
    <span class="oi-ml-2 oi-text-foreground">
      <slot />
    </span>
  </label>
</template>


