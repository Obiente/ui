<template>
  <Grid :cols="{ base: 1, sm: 2, md: 3 }" :gap="2">
    <Button 
      v-if="variant === 'basic'"
      v-for="buttonVariant in basicVariants"
      :key="buttonVariant"
      :variant="buttonVariant"
     
    >
      {{ buttonVariant }}
    </Button>
    
    <Button 
      v-else-if="variant === 'sizes'"
      v-for="size in sizes"
      :key="size"
      :size="size"
      variant="primary"
     
    >
      {{ size }}
    </Button>
    
    <template v-else-if="variant === 'states'">
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </template>
    
    <template v-else-if="variant === 'interactive'">
      <Button variant="primary" @click="handleClick">
        Click Me
      </Button>
      <Button variant="outline" @click="showAlert">
        Show Alert
      </Button>
    </template>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, Button } from '@obiente/ui'

interface Props {
  variant: string
}

defineProps<Props>()

const basicVariants = ['primary', 'secondary', 'outline', 'ghost', 'destructive']
const sizes = ['sm', 'md', 'lg']

const handleClick = () => {
  console.log('Button clicked!')
}

const showAlert = () => {
  if (typeof window !== 'undefined') {
    alert('Hello from Obiente UI!')
  }
}
</script>
