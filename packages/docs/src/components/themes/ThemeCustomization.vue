<template>
  <Card>
    <Stack :gap="4">
      <Stack :gap="1">
        <h2>Theme Customization</h2>
        <p>
          Learn how to customize themes and create your own color schemes
        </p>
      </Stack>
      
      <Grid :cols="{ base: 1, md: 2 }" :gap="4">
        <CustomizationExample />
        <ThemeVariables />
      </Grid>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Grid } from '@obiente/ui'
import CustomizationExample from './CustomizationExample.vue'
import ThemeVariables from './ThemeVariables.vue'
</script>
