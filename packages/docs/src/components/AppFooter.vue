<template>
  <footer class="app-footer">
    <Container>
      <Flex 
        justify="center" 
        align="center" 
        direction="column"
        :gap="4"
       
      >
        <FooterMessage />
        <FooterLinks />
      </Flex>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import { Container, Flex } from '@obiente/ui'
import FooterMessage from './footer/FooterMessage.vue'
import FooterLinks from './footer/FooterLinks.vue'
</script>


