<template>
  <ThemeProvider>
    <Flex direction="column" class="min-h-screen">
      <AppHeader :current-page="currentPage" @navigate="handleNavigation" />
      <Flex direction="column" flex="1">
        <slot />
      </Flex>
      <AppFooter />
    </Flex>
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ThemeProvider, Flex } from "@obiente/ui";
  import AppHeader from "./AppHeader.vue";
  import AppFooter from "./AppFooter.vue";

  const currentPage = ref('home');

  const handleNavigation = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };
</script>
