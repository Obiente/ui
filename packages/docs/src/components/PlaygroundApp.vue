<template>
  <div class="playground-app">
    <!-- Theme Selector -->
    <div class="mb-6">
      <label for="theme-select" class="block text-sm font-medium mb-2">
        Choose Theme:
      </label>
      <select 
        id="theme-select"
        v-model="selectedTheme"
        @change="applyTheme"
        class="w-full p-2 border rounded-md bg-background"
      >
        <option value="catppuccin-mocha">Catppuccin Mocha</option>
        <option value="catppuccin-macchiato">Catppuccin Macchiato</option>
        <option value="github-dark">GitHub Dark</option>
        <option value="github-light">GitHub Light</option>
      </select>
    </div>

    <!-- Component Showcase -->
    <div class="space-y-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Buttons</h3>
        <div class="flex flex-wrap gap-3">
          <Button :theme-classes="currentTheme.button.primary">
            Primary
          </Button>
          <Button :theme-classes="currentTheme.button.secondary">
            Secondary
          </Button>
          <Button :theme-classes="currentTheme.button.outline">
            Outline
          </Button>
          <Button :theme-classes="currentTheme.button.ghost">
            Ghost
          </Button>
          <Button :theme-classes="currentTheme.button.destructive">
            Destructive
          </Button>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-3">Inputs</h3>
        <div class="space-y-3 max-w-md">
          <Input 
            :theme-classes="currentTheme.input.default"
            placeholder="Default input"
          />
          <Input 
            :theme-classes="currentTheme.input.error"
            placeholder="Error state"
            value="Invalid input"
          />
        </div>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-3">Cards</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <Card :theme-classes="currentTheme.card.default">
            <h4 class="font-medium mb-2">Default Card</h4>
            <p class="text-sm text-muted-foreground">
              This is a default card component with basic styling.
            </p>
          </Card>
          <Card :theme-classes="currentTheme.card.elevated">
            <h4 class="font-medium mb-2">Elevated Card</h4>
            <p class="text-sm text-muted-foreground">
              This card has elevation and shadow effects.
            </p>
          </Card>
        </div>
      </section>
    </div>

    <!-- Color Palette -->
    <section class="mt-8">
      <h3 class="text-lg font-semibold mb-3">Color Palette</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        <div 
          v-for="color in colorPalette" 
          :key="color.name"
          class="aspect-square rounded-lg flex items-center justify-center text-white text-xs font-medium"
          :style="{ backgroundColor: color.value }"
        >
          {{ color.name }}
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="mt-8">
      <h3 class="text-lg font-semibold mb-3">Code Example</h3>
      <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>{{ codeExample }}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button, Input, Card } from '../ui-components'
import { catppuccinMochaTheme } from '../theme-data'

const selectedTheme = ref('catppuccin-mocha')

// For now, we'll use catppuccin-mocha as our theme
// In a full implementation, we'd load different themes based on selection
const currentTheme = computed(() => catppuccinMochaTheme)

const colorPalette = computed(() => [
  { name: 'Blue', value: 'var(--color-blue)' },
  { name: 'Green', value: 'var(--color-green)' },
  { name: 'Yellow', value: 'var(--color-yellow)' },
  { name: 'Red', value: 'var(--color-red)' },
  { name: 'Mauve', value: 'var(--color-mauve)' },
  { name: 'Pink', value: 'var(--color-pink)' },
  { name: 'Teal', value: 'var(--color-teal)' },
  { name: 'Sky', value: 'var(--color-sky)' },
])

const codeExample = computed(() => `<template>
  <Button :theme-classes="catppuccinMochaTheme.button.primary">
    Primary Button
  </Button>
  
  <Input 
    :theme-classes="catppuccinMochaTheme.input.default"
    placeholder="Themed input"
  />
  
  <Card :theme-classes="catppuccinMochaTheme.card.elevated">
    <h3>Card Content</h3>
    <p>This card uses the elevated theme variant.</p>
  </Card>
</template>

<script setup>
import { Button, Input, Card } from '../ui-components'
import { catppuccinMochaTheme } from '../theme-data'
<\/script>

<style>
@import '@obiente/themes/catppuccin-mocha';
</style>`)

const applyTheme = () => {
  // In a full implementation, this would dynamically load and apply different themes
  console.log('Theme changed to:', selectedTheme.value)
}

onMounted(() => {
  applyTheme()
})
</script>

<style scoped>
.playground-app {
  min-height: 400px;
}
</style>
