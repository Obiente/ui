<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ src?: string; alt?: string }>();
</script>

<template>
  <div :class="[
    'oi-bg-surface',
    'oi-border',
    'oi-rounded-full',
    'oi-w-full',
    'oi-h-full',
    $attrs.class
  ]">
    <img v-if="src" :src="src" :alt="alt" class="oi-rounded-full oi-w-full oi-h-full" />
    <slot v-else />
  </div>
</template>


