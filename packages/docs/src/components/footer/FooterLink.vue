<template>
  <Button 
    variant="ghost" 
    size="sm"
   
    @click="action"
  >
    {{ label }}
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@obiente/ui'

interface Props {
  label: string
  action: () => void
}

defineProps<Props>()
</script>
