<template>
  <Stack :gap="2">
    <Card>
      <Container>
        <ButtonExamples v-if="componentName === 'Button'" :variant="variant" />
        <InputExamples v-else-if="componentName === 'Input'" :variant="variant" />
        <CardExamples v-else-if="componentName === 'Card'" :variant="variant" />
        <GenericExample v-else :component-name="componentName" :variant="variant" />
      </Container>
    </Card>
    
    <CodeBlock :component-name="componentName" :variant="variant" />
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Card, Container } from '@obiente/ui'
import ButtonExamples from './examples/ButtonExamples.vue'
import InputExamples from './examples/InputExamples.vue'
import CardExamples from './examples/CardExamples.vue'
import GenericExample from './examples/GenericExample.vue'
import CodeBlock from './CodeBlock.vue'

interface Props {
  componentName: string
  variant: string
}

defineProps<Props>()
</script>
