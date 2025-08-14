<template>
  <Stack :gap="3">
    <Breadcrumb :items="breadcrumbItems" />
    <Stack :gap="1">
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
      <ComponentMeta :category="category" />
    </Stack>
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import Breadcrumb from './Breadcrumb.vue'
import ComponentMeta from './ComponentMeta.vue'

interface Props {
  name: string
  description: string
  category: string
}

const props = defineProps<Props>()

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: props.category, href: `/components?category=${props.category.toLowerCase()}` },
  { label: props.name, href: '#', current: true }
]
</script>
