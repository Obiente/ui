<template>
  <Card 
   
    @click="$emit('select', theme.id)"
  >
    <Stack :gap="3">
      <Flex justify="space-between" align="center">
        <Badge :variant="theme.variant">
          {{ theme.icon }}
        </Badge>
        <Button 
          variant="ghost" 
          size="sm"
         
          @click.stop="$emit('select', theme.id)"
        >
          Select
        </Button>
      </Flex>
      
      <Stack :gap="1">
        <h3>{{ theme.name }}</h3>
        <p>{{ theme.description }}</p>
      </Stack>
      
      <ColorPalette :colors="theme.colors" />
      
      <ComponentPreview :theme-id="theme.id" />
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Flex, Badge, Button } from '@obiente/ui'
import ColorPalette from './ColorPalette.vue'
import ComponentPreview from './ComponentPreview.vue'

interface Props {
  theme: {
    id: string
    name: string
    description: string
    icon: string
    variant: string
    colors: Record<string, string>
  }
}

defineProps<Props>()

defineEmits<{
  select: [themeId: string]
}>()
</script>
