<template>
  <Flex class="documentation-layout" direction="row" align="stretch">
    <!-- Mobile Toggle -->
    <MobileNavToggle @toggle="toggleMobileSidebar" />

    <!-- Overlay for mobile -->
    <div 
      v-if="isMobileSidebarOpen" 
      class="mobile-overlay"
      @click="closeMobileSidebar"
    ></div>

    <!-- Sidebar -->
    <div :class="['documentation-sidebar', { 'mobile-open': isMobileSidebarOpen }]">
      <Card themeClasses="surface.raised border.subtle" class="sidebar-card">
        <Stack space="4" class="sidebar-content">
          <ComponentsSidebar :current-page="currentPage" />
        </Stack>
      </Card>
    </div>

    <!-- Main Content Area -->
    <Flex direction="column" class="documentation-main" flex="1">
      <Container size="xl" themeClasses="surface.base" class="main-content-container">
        <slot />
      </Container>
    </Flex>
  </Flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Container, Flex, Stack, Card } from '@obiente/ui'
import ComponentsSidebar from '../ComponentsSidebar.vue'
import MobileNavToggle from './MobileNavToggle.vue'

interface Props {
  currentPage: string
}

defineProps<Props>()

const isMobileSidebarOpen = ref(false)

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}
</script>


