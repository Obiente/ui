<template>
  <Card>
    <Stack :gap="2">
      <GettingStartedHeader />
      <p>All components support extensive theming through our theme system:</p>
      <FeatureGrid />
      <ActionButtons />
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack } from '@obiente/ui'
import GettingStartedHeader from './GettingStartedHeader.vue'
import FeatureGrid from './FeatureGrid.vue'
import ActionButtons from './ActionButtons.vue'
</script>
