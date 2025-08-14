<template>
  <Card>
    <Stack :gap="3" align="center">
      <Stack :gap="1" align="center">
        <Badge variant="primary" size="lg">
          🤝
        </Badge>
        <h2>
          Join the Community
        </h2>
        <p>
          Connect with other developers and contribute to Obiente UI
        </p>
      </Stack>
      
      <Flex :gap="2">
        <Button 
          variant="outline" 
         
          @click="openGitHub"
        >
          GitHub
        </Button>
        <Button 
          variant="outline" 
         
          @click="openDocs"
        >
          Documentation
        </Button>
      </Flex>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Flex, Button, Badge } from '@obiente/ui'

const openGitHub = () => {
  window.open('https://github.com/obiente/ui', '_blank')
}

const openDocs = () => {
  window.location.href = '/components'
}
</script>
