<template>
  <button 
    :class="['nav-button', { 'nav-button--active': isActive }]"
    @click="$emit('navigate', path)"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  path: string
  isActive: boolean
}

defineProps<Props>()

defineEmits<{
  navigate: [path: string]
}>()
</script>


