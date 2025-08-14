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

// Helper function to set theme by ID
const setThemeById = (id: string) => {
  if (!themeContext) return
  
  const theme = themeContext.availableThemes.value.find(t => t.id === id)
  if (theme) {
    themeContext.setTheme(theme)
  }
}

const toggleDarkMode = () => {
  themeContext?.toggleDarkMode();
};

// Computed theme value for Select v-model
const selectedTheme = computed({
  get: () => {
    const currentId = themeContext?.currentTheme.value?.id || ''
    return currentId
  },
  set: (value: string) => {
    setThemeById(value)
  }
})
</script>


