/**
 * ThemeSwitch Component
 * Allows users to switch themes with a dropdown
 */

<template>
  <div class="oi-flex oi-items-center oi-gap-2">
    <label v-if="showLabel" class="oi-text-sm oi-font-medium oi-text-foreground">
      Theme:
    </label>
    <Select 
      v-model="selectedTheme" 
      @update:modelValue="handleThemeChange"
      :options="themeOptions"
      placeholder="Select theme"
      class="oi-min-w-32"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../composables/use-theme';
import Select from './Select.vue';

interface Props {
  showLabel?: boolean;
  showVariant?: boolean;
}

withDefaults(defineProps<Props>(), {
  showLabel: false,
  showVariant: false,
});

// Get theme context
const { currentTheme, availableThemes, setThemeById } = useTheme();

// Computed for selected theme
const selectedTheme = computed({
  get: () => currentTheme.value?.id || '',
  set: (value: string) => {
    if (value) {
      setThemeById(value);
    }
  }
});

// Convert themes to Select options format
const themeOptions = computed(() => {
  return availableThemes.value.map(theme => ({
    label: theme.name,
    value: theme.id,
  }));
});

// Handle theme change - can be string or string[] from Select
const handleThemeChange = (value: string | string[]) => {
  const themeId = Array.isArray(value) ? value[0] : value;
  if (themeId) {
    setThemeById(themeId);
  }
};
</script>


