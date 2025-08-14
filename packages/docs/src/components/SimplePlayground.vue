<template>
  <Container class="oi-px-4 oi-py-6">
    <Stack :gap="4" class="oi-w-full">
      <!-- Header -->
      <Stack :gap="2" align="center" class="oi-text-center">
        <Badge variant="primary" size="lg">
          🎮 Interactive Playground
        </Badge>
        <h1 class="oi-text-2xl oi-font-bold oi-text-color-text">
          Obiente UI Components
        </h1>
        <p class="oi-text-color-text-muted">
          Explore our component library with live examples
        </p>
      </Stack>

      <!-- Theme Switcher -->
      <Card class="oi-p-4">
        <Stack :gap="3">
          <h2 class="oi-text-lg oi-font-semibold oi-text-color-text">
            🎨 Theme Selection
          </h2>
          <p class="oi-text-sm oi-text-color-text-muted">
            Switch between different Catppuccin themes to see components adapt
          </p>
          <ThemeSwitch />
        </Stack>
      </Card>

      <!-- Component Examples Grid -->
      <Grid :cols="{ sm: 1, md: 2, lg: 3 }" :gap="4">
        <!-- Button Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Buttons</h3>
            <Stack :gap="2">
              <Button variant="primary">
                Primary Button
              </Button>
              <Button variant="secondary">
                Secondary Button
              </Button>
              <Button variant="outline">
                Outline Button
              </Button>
            </Stack>
          </Stack>
        </Card>

        <!-- Badge Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Badges</h3>
            <Flex :gap="2" wrap>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </Flex>
          </Stack>
        </Card>

        <!-- Input Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Form Inputs</h3>
            <Stack :gap="2">
              <Input 
                placeholder="Enter your name..." 
              />
              <Input 
                type="email" 
                placeholder="Enter your email..." 
              />
            </Stack>
          </Stack>
        </Card>

        <!-- Layout Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Layout</h3>
            <Stack :gap="2">
              <Flex :gap="2" class="oi-p-2 oi-bg-color-surface oi-rounded-md oi-border">
                <div class="oi-p-2 oi-bg-color-primary oi-text-white oi-rounded">Flex Item 1</div>
                <div class="oi-p-2 oi-bg-color-primary oi-text-white oi-rounded">Flex Item 2</div>
              </Flex>
              <Grid :cols="2" :gap="2" class="oi-p-2 oi-bg-color-surface oi-rounded-md oi-border">
                <div class="oi-p-2 oi-bg-color-primary oi-text-white oi-rounded">Grid Item 1</div>
                <div class="oi-p-2 oi-bg-color-primary oi-text-white oi-rounded">Grid Item 2</div>
              </Grid>
            </Stack>
          </Stack>
        </Card>

        <!-- Card Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Cards</h3>
            <Card class="oi-p-3 oi-bg-color-surface">
              <Stack :gap="2">
                <Flex justify="space-between" align="center">
                  <h4 class="oi-text-sm oi-font-medium oi-text-color-text">Nested Card</h4>
                  <Badge variant="primary" size="sm">New</Badge>
                </Flex>
                <p class="oi-text-xs oi-text-color-text-muted">
                  This is a card inside another card
                </p>
              </Stack>
            </Card>
          </Stack>
        </Card>

        <!-- Switch Examples -->
        <Card class="oi-p-4">
          <Stack :gap="3">
            <h3 class="oi-text-lg oi-font-semibold oi-text-color-text">Interactive</h3>
            <Stack :gap="2">
              <Flex align="center" :gap="2">
                <Switch v-model="switchValue" />
                <span class="oi-text-sm oi-text-color-text">Toggle me</span>
              </Flex>
              <Checkbox v-model="checkboxValue">
                Check this option
              </Checkbox>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <!-- Call to Action -->
      <Card class="oi-p-6">
        <Stack :gap="3" align="center" class="oi-text-center">
          <h2 class="oi-text-xl oi-font-bold oi-text-color-text">
            Ready to build with Obiente UI?
          </h2>
          <p class="oi-text-color-text-muted">
            Check out our component reference for detailed documentation
          </p>
          <Flex :gap="2">
            <Button variant="primary">
              View Documentation
            </Button>
            <Button variant="outline">
              GitHub Repository
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Container, 
  Stack, 
  Card, 
  Badge, 
  Button, 
  Grid, 
  Flex, 
  Input,
  Switch,
  Checkbox
} from '@obiente/ui'
import ThemeSwitch from './ThemeSwitch.vue'

const switchValue = ref(false)
const checkboxValue = ref(false)
</script>


