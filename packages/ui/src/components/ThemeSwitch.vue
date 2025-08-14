/**
 * ThemeSwitch Component
 * Allows users to switch themes with a dropdown
 */

<template>
  <div class="theme-switch">
    <Select 
      v-model="selectedTheme" 
      @update:modelValue="handleThemeChange"
      :themeClasses="themeClasses"
    >
      <option v-for="theme in availableThemes" :key="theme.id" :value="theme.id">
        {{ theme.name }}
      </option>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../composables/use-theme';
import Select from './Select.vue';

interface Props {
  themeClasses?: string;
  showVariant?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  themeClasses: 'default',
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

// Handle theme change
const handleThemeChange = (themeId: string) => {
  setThemeById(themeId);
};
</script>


