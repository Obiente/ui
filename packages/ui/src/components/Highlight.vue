<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import { computed } from 'vue'

export interface HighlightProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Text to search and highlight within
   */
  text?: string
  
  /**
   * Query string to highlight
   */
  query?: string | string[]
  
  /**
   * Case sensitive search
   */
  caseSensitive?: boolean
  
  /**
   * Match whole words only
   */
  matchAll?: boolean
  
  /**
   * Ignore diacritics
   */
  ignoreCase?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'emphasized' | 'subtle'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<HighlightProps>(), {
  themeClasses: '',
  text: '',
  query: '',
  caseSensitive: false,
  matchAll: false,
  ignoreCase: true,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate highlight classes for theme system
 */
const highlightClasses = computed(() => {
  const classes = ['oi-highlight']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-highlight--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-highlight--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})
</script>

<template>
  <Highlight.Root
    :class="highlightClasses"
    :text="text"
    :query="query"
    :case-sensitive="caseSensitive"
    :match-all="matchAll"
    :ignore-case="ignoreCase"
  >
    <Highlight.Context>
      <template #default="{ chunks }">
        <slot name="content" :chunks="chunks">
          <span
            v-for="(chunk, index) in chunks"
            :key="index"
            :class="{
              'oi-highlight-match': chunk.match,
              'oi-highlight-text': !chunk.match
            }"
          >
            {{ chunk.text }}
          </span>
        </slot>
      </template>
    </Highlight.Context>
  </Highlight.Root>
</template>


