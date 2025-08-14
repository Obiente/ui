<template>
  <DocumentationLayout :current-page="`/components/${componentName.toLowerCase()}`">
    <Stack :gap="6" themeClasses="component-doc-stack">
      <ComponentHeader 
        :name="componentName"
        :description="description"
        :category="category"
      />
      
      <ComponentExamples :component-name="componentName" />
      
      <ComponentAPI :component-name="componentName" />
      
      <PlaygroundLink :component-name="componentName" />
    </Stack>
  </DocumentationLayout>
</template>

<script setup lang="ts">
import { Container, Stack } from '@obiente/ui'
import ComponentHeader from './ComponentHeader.vue'
import ComponentExamples from './ComponentExamples.vue'
import ComponentAPI from './ComponentAPI.vue'
import PlaygroundLink from './PlaygroundLink.vue'

interface Props {
  componentName: string
  description: string
  category: string
}

defineProps<Props>()
</script>
