<template>
  <Flex :gap="1">
    <FooterLink 
      v-for="link in footerLinks"
      :key="link.label"
      :label="link.label"
      :action="link.action"
    />
  </Flex>
</template>

<script setup lang="ts">
import { Flex } from '@obiente/ui'
import FooterLink from './FooterLink.vue'

const footerLinks = [
  {
    label: 'Documentation',
    action: () => window.location.href = '/components'
  },
  {
    label: 'GitHub',
    action: () => window.open('https://github.com/obiente/ui', '_blank')
  },
  {
    label: 'Playground',
    action: () => window.location.href = '/playground'
  }
]
</script>
