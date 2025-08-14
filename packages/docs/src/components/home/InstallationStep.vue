<template>
  <Flex :gap="2">
    <Badge variant="primary">
      {{ number }}
    </Badge>
    <Stack :gap="0.5">
      <span>{{ title }}</span>
      <Badge variant="secondary">
        {{ code }}
      </Badge>
    </Stack>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Stack, Badge } from '@obiente/ui'

interface Props {
  number: number
  title: string
  code: string
}

defineProps<Props>()
</script>
