<template>
  <Flex align="center" :gap="0.5">
    <Button 
      v-if="!item.current"
      variant="ghost" 
      size="sm"
     
      @click="navigate(item.href)"
    >
      {{ item.label }}
    </Button>
    <span v-else>{{ item.label }}</span>
    
    <span v-if="!isLast">›</span>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Button } from '@obiente/ui'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface Props {
  item: BreadcrumbItem
  isLast: boolean
}

defineProps<Props>()

const navigate = (href: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = href
  }
}
</script>
