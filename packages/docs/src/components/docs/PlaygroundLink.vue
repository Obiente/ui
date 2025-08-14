<template>
  <Card>
    <Stack :gap="2" align="center">
      <Badge variant="primary" size="lg">🛝</Badge>
      <h3>Try it Live</h3>
      <p>
        Experiment with the {{ componentName }} component in our interactive playground
      </p>
      <Button 
        variant="primary" 
       
        @click="openPlayground"
      >
        Open in Playground →
      </Button>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Badge, Button } from '@obiente/ui'

interface Props {
  componentName: string
}

const props = defineProps<Props>()

const openPlayground = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `/playground?component=${props.componentName}`
  }
}
</script>
