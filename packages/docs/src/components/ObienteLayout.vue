<template>
  <ThemeProvider 
    :themes="availableThemes"
    default-theme="catppuccin-mocha"
    :persist-theme="true"
    :use-system-preference="true"
  >
    <Flex direction="column" class="min-h-screen">
      <AppHeader 
        :current-page="currentPage" 
        @navigate="handleNavigation"
      />
      <Flex direction="column" flex="1">
        <slot />
      </Flex>
      <AppFooter />
    </Flex>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ThemeProvider, Flex } from '@obiente/ui';
import { 
  catppuccinMochaTheme,
  catppuccinLatteTheme, 
  catppuccinFrappeTheme,
  catppuccinMacchiatoTheme 
} from '@obiente/themes';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

interface Props {
  currentPage: string;
}

defineProps<Props>();

// Available themes for the docs
const availableThemes = [
  catppuccinMochaTheme,
  catppuccinLatteTheme,
  catppuccinFrappeTheme,
  catppuccinMacchiatoTheme,
];

// Debug logging
console.log('ObienteLayout: Available themes:', availableThemes);
availableThemes.forEach(theme => {
  console.log(`Theme: ${theme.name} (${theme.id}) - ${theme.variant}`, theme);
});

const handleNavigation = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};
</script>
