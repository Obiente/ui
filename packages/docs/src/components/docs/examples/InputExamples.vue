<template>
  <Stack :gap="2">
    <Input 
      v-if="variant === 'basic'"
      placeholder="Basic input"
     
    />
    
    <template v-else-if="variant === 'sizes'">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </template>
    
    <template v-else-if="variant === 'states'">
      <Input placeholder="Normal input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Error input" error />
    </template>
    
    <template v-else-if="variant === 'interactive'">
      <Input 
        v-model="inputValue"
        placeholder="Type something..."
       
      />
      <p v-if="inputValue">
        You typed: {{ inputValue }}
      </p>
    </template>
  </Stack>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Stack, Input } from '@obiente/ui'

interface Props {
  variant: string
}

defineProps<Props>()

const inputValue = ref('')
</script>
