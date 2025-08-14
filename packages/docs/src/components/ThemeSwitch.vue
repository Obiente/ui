<template>
  <div class="oi-flex oi-align-center oi-gap-2">
    <Flex align="center" :gap="2" v-if="themeContext">
      <!-- Theme Toggle for Dark/Light -->
      <Button 
        @click="toggleDarkMode"
        variant="ghost"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="oi-p-2"
      >
        <span>{{ isDark ? '☀️' : '🌙' }}</span>
      </Button>
      
      <!-- Theme Selector Dropdown -->
      <Select
        v-model="selectedTheme"
        :options="availableThemes"
        class="oi-min-w-48"
      />
    </Flex>
    
    <!-- Fallback when no theme provider -->
    <div v-else class="oi-flex oi-align-center oi-gap-2 oi-text-color-text-muted">
      <span>🎨</span>
      <span class="oi-text-sm">No themes available</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useThemeOptional, Flex, Button, Select } from '@obiente/ui';

// Get theme context (optional)
const themeContext = useThemeOptional();

// Debug logging
onMounted(() => {
  console.log('ThemeSwitch mounted');
  console.log('themeContext:', themeContext);
  if (themeContext) {
    console.log('availableThemes:', themeContext.availableThemes.value);
    console.log('currentTheme:', themeContext.currentTheme.value);
  }
});

// Only destructure if context exists
const currentTheme = computed(() => themeContext?.currentTheme.value || null);
const isDark = computed(() => themeContext?.isDark.value || false);

// Format available themes for Obiente Select
const availableThemes = computed(() => {
  if (!themeContext) return [];
  return themeContext.availableThemes.value.map((theme: any) => ({
    label: theme.name,
    value: theme.id
  }));
});

const setThemeById = (id: string) => {
  console.log('ThemeSwitch: Setting theme by ID:', id);
  themeContext?.setThemeById(id);
  
  // Debug: Check if CSS variables are applied after theme change
  setTimeout(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    console.log('After theme change:');
    console.log('--oi-color-primary:', styles.getPropertyValue('--oi-color-primary'));
    console.log('--oi-color-background:', styles.getPropertyValue('--oi-color-background'));
    console.log('data-theme attribute:', root.getAttribute('data-theme'));
  }, 100);
};

const toggleDarkMode = () => {
  themeContext?.toggleDarkMode();
};

// Computed for selected theme
const selectedTheme = computed({
  get: () => currentTheme.value?.id || '',
  set: (value: string) => {
    if (value) {
      setThemeById(value);
    }
  }
});
</script>


