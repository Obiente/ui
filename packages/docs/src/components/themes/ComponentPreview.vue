<template>
  <Container>
    <Flex :gap="2" align="center">
      <Button variant="primary" size="sm">
        Button
      </Button>
      <Badge variant="secondary">Badge</Badge>
      <Input placeholder="Input" size="sm" />
    </Flex>
  </Container>
</template>

<script setup lang="ts">
import { Container, Flex, Button, Badge, Input } from '@obiente/ui'

interface Props {
  themeId: string
}

defineProps<Props>()
</script>
