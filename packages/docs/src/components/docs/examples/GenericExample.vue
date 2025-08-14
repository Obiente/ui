<template>
  <Card>
    <Stack :gap="2">
      <Badge variant="primary">
        {{ componentName }}
      </Badge>
      <p>
        Example for {{ componentName }} component ({{ variant }} variant)
      </p>
      <Button variant="outline" size="sm" @click="viewDocs">
        View Documentation
      </Button>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Badge, Button } from '@obiente/ui'

interface Props {
  componentName: string
  variant: string
}

defineProps<Props>()

const viewDocs = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/components'
  }
}
</script>
