<template>
  <Card>
    <Stack :gap="3">
      <Stack :gap="1">
        <h2>
          Quick Start
        </h2>
        <p>
          Get up and running with Obiente UI in minutes
        </p>
      </Stack>
      
      <InstallationSteps />
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack } from '@obiente/ui'
import InstallationSteps from './InstallationSteps.vue'
</script>
