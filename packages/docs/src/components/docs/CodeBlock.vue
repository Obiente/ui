<template>
  <Card>
    <Stack :gap="2">
      <Flex justify="space-between" align="center">
        <Badge variant="secondary">Vue</Badge>
        <Button 
          variant="ghost" 
          size="sm" 
         
          @click="copyCode"
        >
          📋 Copy
        </Button>
      </Flex>
      
      <Container>
        <Badge variant="outline">
          {{ codeExample }}
        </Badge>
      </Container>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Flex, Badge, Button, Container } from '@obiente/ui'

interface Props {
  componentName: string
  variant: string
}

const props = defineProps<Props>()

const codeExample = `<${props.componentName} variant="${props.variant}">
  Example ${props.componentName}
</${props.componentName}>`

const copyCode = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(codeExample)
  }
}
</script>
