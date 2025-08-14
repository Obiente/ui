<template>
  <Grid :cols="{ base: 1, md: 2 }" :gap="3">
    <Card v-if="variant === 'basic'">
      <Stack :gap="2">
        <h3>Basic Card</h3>
        <p>This is a basic card component.</p>
      </Stack>
    </Card>
    
    <template v-else-if="variant === 'sizes'">
      <Card>
        <Container>
          <span>Small Card</span>
        </Container>
      </Card>
      <Card>
        <Container>
          <span>Medium Card</span>
        </Container>
      </Card>
      <Card>
        <Container>
          <span>Large Card</span>
        </Container>
      </Card>
    </template>
    
    <template v-else-if="variant === 'interactive'">
      <Card @click="handleCardClick">
        <Stack :gap="2">
          <h3>Clickable Card</h3>
          <p>Click me to interact!</p>
          <Button variant="primary" size="sm">Action</Button>
        </Stack>
      </Card>
    </template>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, Card, Stack, Container, Button } from '@obiente/ui'

interface Props {
  variant: string
}

defineProps<Props>()

const handleCardClick = () => {
  console.log('Card clicked!')
}
</script>
