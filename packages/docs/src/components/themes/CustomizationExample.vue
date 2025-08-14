<template>
  <Stack :gap="3">
    <h3>Custom Theme Example</h3>
    
    <Card>
      <Stack :gap="2">
        <Badge variant="secondary">CSS Variables</Badge>
        <Container>
          <Badge variant="outline">
            :root {<br/>
            &nbsp;&nbsp;--color-primary: #your-color;<br/>
            &nbsp;&nbsp;--color-secondary: #your-color;<br/>
            }
          </Badge>
        </Container>
      </Stack>
    </Card>
  </Stack>
</template>

<script setup lang="ts">
import { Stack, Card, Container, Badge } from '@obiente/ui'
</script>
