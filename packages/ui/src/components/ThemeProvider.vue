<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '../composables'
import type { ThemePreferences } from '../utils/theme-preferences'

interface Props {
  initialPreferences?: ThemePreferences
}

const props = defineProps<Props>()

const { setPreferences, initialize } = useTheme()

onMounted(() => {
  if (props.initialPreferences) {
    setPreferences(props.initialPreferences)
  }
  initialize()
})
</script>