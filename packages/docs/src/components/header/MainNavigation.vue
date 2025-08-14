<template>
  <nav class="main-navigation">
    <Flex align="center" :gap="0.5" themeClasses="nav-list">
      <NavButton
        v-for="item in navItems"
        :key="item.path"
        :label="item.label"
        :active="isActive(item.path)"
        @click="handleNavigation(item.path)"
      />
    </Flex>
  </nav>
</template>

<script setup lang="ts">
  import { Flex, NavButton } from "@obiente/ui";

  interface Props {
    currentPage: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    navigate: [path: string];
  }>();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Components", path: "/components" },
    { label: "Themes", path: "/themes" },
    { label: "Playground", path: "/playground" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return props.currentPage === "/";
    }
    return props.currentPage.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    emit("navigate", path);
  };
</script>


