<template>
  <Card>
    <Stack :gap="3">
      <h3>Implementation Example</h3>
      
      <Stack :gap="2">
        <CodeStep 
          title="1. Wrap your app with ThemeProvider"
          code='<ThemeProvider defaultTheme="catppuccin-mocha">'
        />
        <CodeStep 
          title="2. Use theme classes on components"
          code='<Button>Click me</Button>'
        />
        <CodeStep 
          title="3. Theme switching"
          code='const { changeTheme } = useThemeProvider()'
        />
      </Stack>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack } from '@obiente/ui'
import CodeStep from './CodeStep.vue'
</script>
