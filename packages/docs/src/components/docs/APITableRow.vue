<template>
  <Grid 
    :cols="type === 'props' ? 4 : type === 'events' ? 3 : 2" 
    :gap="1" 
   
  >
    <Badge variant="outline">{{ item.name }}</Badge>
    <Badge variant="outline" v-if="type === 'props'">{{ item.type }}</Badge>
    <Badge variant="outline" v-if="type === 'props'">{{ item.default }}</Badge>
    <Badge variant="outline" v-if="type === 'events'">{{ item.payload }}</Badge>
    <span>{{ item.description }}</span>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, Badge } from '@obiente/ui'

interface Props {
  item: any
  type: 'props' | 'events' | 'slots'
}

defineProps<Props>()
</script>
