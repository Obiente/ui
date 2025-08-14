<template>
  <Card>
    <Stack :gap="3">
      <h3>{{ title }}</h3>
      
      <Grid :cols="1" :gap="1">
        <APITableHeader :type="type" />
        <APITableRow 
          v-for="item in data"
          :key="item.name"
          :item="item"
          :type="type"
        />
      </Grid>
    </Stack>
  </Card>
</template>

<script setup lang="ts">
import { Card, Stack, Grid } from '@obiente/ui'
import APITableHeader from './APITableHeader.vue'
import APITableRow from './APITableRow.vue'

interface Props {
  title: string
  data: any[]
  type: 'props' | 'events' | 'slots'
}

defineProps<Props>()
</script>
