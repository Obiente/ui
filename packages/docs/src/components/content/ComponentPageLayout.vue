<template>
  <DocumentationLayout :current-page="currentPage">
    <slot />
  </DocumentationLayout>
</template>

<script setup lang="ts">
import DocumentationLayout from './DocumentationLayout.vue'

interface Props {
  currentPage: string
}

defineProps<Props>()
</script>
