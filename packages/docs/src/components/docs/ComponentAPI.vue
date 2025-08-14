<template>
  <Stack :gap="4">
    <h2>API Reference</h2>
    
    <APISection title="Props" :data="propsData" type="props" />
    <APISection title="Events" :data="eventsData" type="events" />
    <APISection title="Slots" :data="slotsData" type="slots" />
  </Stack>
</template>

<script setup lang="ts">
import { Stack } from '@obiente/ui'
import APISection from './APISection.vue'

interface Props {
  componentName: string
}

const props = defineProps<Props>()

// Mock API data - in real app, this would come from component definitions
const propsData = [
  { name: 'variant', type: 'string', default: 'primary', description: 'Visual style of the component' },
  { name: 'size', type: 'string', default: 'md', description: 'Size of the component' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the component is disabled' }
]

const eventsData = [
  { name: 'click', payload: 'Event', description: 'Fired when component is clicked' },
  { name: 'focus', payload: 'Event', description: 'Fired when component receives focus' }
]

const slotsData = [
  { name: 'default', description: 'Default slot content' },
  { name: 'icon', description: 'Slot for icon content' }
]
</script>
