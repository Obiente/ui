<template>
  <!-- Header -->
  <Stack :gap="2" themeClasses="header-content">
    <h2 class="sidebar-title">Components</h2>
    <p class="sidebar-description">Browse all available components</p>
  </Stack>

  <!-- Search Box -->
  <div class="search-section">
    <Input
      v-model="searchQuery"
      placeholder="Search components..."
      themeClasses="search-input"
    />
  </div>

  <!-- Component Categories -->
  <Stack :gap="4">
    <div v-for="category in filteredCategories" :key="category.name">
      <h3 class="category-title">{{ category.name }}</h3>
      <Stack :gap="1">
        <Button
          v-for="component in category.components"
          :key="component.href"
          :variant="isActive(component.href) ? 'primary' : 'ghost'"
          size="sm"
          @click="navigate(component.href)"
        >
          <Flex
            align="center"
            justify="start"
            :gap="2"
            themeClasses="button-content"
          >
            <span class="component-icon">{{ component.icon }}</span>
            <span class="component-name">{{ component.name }}</span>
          </Flex>
        </Button>
      </Stack>
    </div>
  </Stack>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import { Stack, Button, Flex, Input } from "@obiente/ui";

  interface Props {
    currentPage: string;
  }

  const props = defineProps<Props>();
  const searchQuery = ref("");

  interface Component {
    name: string;
    href: string;
    icon: string;
  }

  interface Category {
    name: string;
    components: Component[];
  }

  const categories: Category[] = [
    {
      name: "Layout",
      components: [
        { name: "Container", href: "/components/container", icon: "📦" },
        { name: "Grid", href: "/components/grid", icon: "🔲" },
        { name: "Flex", href: "/components/flex", icon: "↔️" },
      ],
    },
    {
      name: "Forms",
      components: [
        { name: "Button", href: "/components/button", icon: "🔘" },
        { name: "Input", href: "/components/input", icon: "✏️" },
        { name: "Select", href: "/components/select", icon: "📋" },
        { name: "Checkbox", href: "/components/checkbox", icon: "☑️" },
        { name: "Radio", href: "/components/radio", icon: "⚪" },
        { name: "Switch", href: "/components/switch", icon: "🔀" },
      ],
    },
    {
      name: "Feedback",
      components: [
        { name: "Alert", href: "/components/alert", icon: "⚠️" },
        { name: "Badge", href: "/components/badge", icon: "🏷️" },
      ],
    },
    {
      name: "Overlays",
      components: [{ name: "Modal", href: "/components/modal", icon: "🗨️" }],
    },
    {
      name: "Display",
      components: [
        { name: "Card", href: "/components/card", icon: "🃏" },
        { name: "Tabs", href: "/components/tabs", icon: "📑" },
      ],
    },
  ];

  const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories;

    return categories
      .map((category) => ({
        ...category,
        components: category.components.filter((component) =>
          component.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        ),
      }))
      .filter((category) => category.components.length > 0);
  });

  const isActive = (href: string) => {
    return props.currentPage === href || props.currentPage.startsWith(href);
  };

  const navigate = (href: string) => {
    window.location.href = href;
  };
</script>
