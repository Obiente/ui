<template>
  <header
    class="app-header"
    role="banner"
    :aria-label="currentPage ? `${currentPage} - Obiente UI` : 'Obiente UI'"
  >
    <Container themeClasses="header-container">
      <Flex justify="space-between" align="center" themeClasses="header-flex">
        <BrandSection
          @navigate="$emit('navigate', $event)"
          aria-label="Obiente UI Home"
        />
        <MainNavigation
          :current-page="currentPage"
          @navigate="$emit('navigate', $event)"
          class="header-nav"
        />
        <HeaderActions class="header-actions" />
      </Flex>
    </Container>
  </header>
</template>

<script setup lang="ts">
  import { Container, Flex } from "@obiente/ui";
  import BrandSection from "./header/BrandSection.vue";
  import MainNavigation from "./header/MainNavigation.vue";
  import HeaderActions from "./header/HeaderActions.vue";
  import { computed } from "vue";

  interface Props {
    /** The current active page name */
    currentPage: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    /** Emitted when navigation is triggered */
    navigate: [path: string];
  }>();

  // Expose header height for potential external consumers
  defineExpose({
    headerHeight: computed(() => {
      return window.matchMedia("(max-width: 768px)").matches ? 64 : 72;
    }),
  });
</script>
