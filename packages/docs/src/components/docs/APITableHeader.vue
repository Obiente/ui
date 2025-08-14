<template>
  <Grid 
    :cols="type === 'props' ? 4 : type === 'events' ? 3 : 2" 
    :gap="1" 
   
  >
    <Badge variant="secondary">Name</Badge>
    <Badge variant="secondary" v-if="type === 'props'">Type</Badge>
    <Badge variant="secondary" v-if="type === 'props'">Default</Badge>
    <Badge variant="secondary" v-if="type === 'events'">Payload</Badge>
    <Badge variant="secondary">Description</Badge>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, Badge } from '@obiente/ui'

interface Props {
  type: 'props' | 'events' | 'slots'
}

defineProps<Props>()
</script>
