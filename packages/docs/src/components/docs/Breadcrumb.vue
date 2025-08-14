<template>
  <Flex align="center" :gap="0.5">
    <BreadcrumbItem 
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :is-last="index === items.length - 1"
    />
  </Flex>
</template>

<script setup lang="ts">
import { Flex } from '@obiente/ui'
import BreadcrumbItem from './BreadcrumbItem.vue'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
