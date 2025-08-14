<template>
  <Card>
    <ComponentsSidebar :current-page="currentPage" />
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@obiente/ui'
import ComponentsSidebar from '../ComponentsSidebar.vue'

interface Props {
  currentPage: string
}

defineProps<Props>()
</script>
