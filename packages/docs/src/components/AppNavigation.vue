<template>
  <Container theme-classes="ctp-mocha-container-default">
    <Grid :cols="1" :gap="0.5">
      <Button 
        v-for="item in navItems"
        :key="item.href"
        :theme-classes="isActive(item.href) ? 'ctp-mocha-btn-primary' : 'ctp-mocha-btn-ghost'"
        @click="navigate(item.href)"
      >
        {{ item.label }}
      </Button>
    </Grid>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Container, Grid, Button } from '@obiente/ui'

export default defineComponent({
  name: 'AppNavigation',
  components: {
    Container,
    Grid,
    Button
  },
  props: {
    currentPage: {
      type: String,
      default: '/'
    }
  },
  setup() {
    const navItems = [
      { href: '/', label: 'Home' },
      { href: '/components', label: 'Components' },
      { href: '/themes', label: 'Themes' },
      { href: '/playground', label: 'Playground' }
    ]

    const navigate = (href: string) => {
      window.location.href = href
    }

    return {
      navItems,
      navigate
    }
  },
  methods: {
    isActive(href: string) {
      return this.currentPage === href
    }
  }
})
</script>
