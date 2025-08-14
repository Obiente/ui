<script setup lang="ts">
import { computed } from 'vue'

export interface CodeProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Code content
   */
  code?: string
  
  /**
   * Programming language for syntax highlighting
   */
  language?: string
  
  /**
   * Show line numbers
   */
  lineNumbers?: boolean
  
  /**
   * Wrap long lines
   */
  wrap?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<CodeProps>(), {
  themeClasses: '',
  code: '',
  language: 'text',
  lineNumbers: false,
  wrap: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate code classes for theme system
 */
const codeClasses = computed(() => {
  const classes = ['oi-code']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-code--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-code--${props.size}`)
  
  // Add language class for potential syntax highlighting
  if (props.language) {
    classes.push(`oi-code--${props.language}`)
  }
  
  if (props.lineNumbers) {
    classes.push('oi-code--line-numbers')
  }
  
  if (props.wrap) {
    classes.push('oi-code--wrap')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Split code into lines for line numbers
 */
const codeLines = computed(() => {
  if (!props.lineNumbers) return []
  return (props.code || '').split('\n')
})
</script>

<template>
  <div :class="codeClasses">
    <template v-if="lineNumbers && codeLines.length > 1">
      <div class="oi-code-container">
        <div class="oi-code-line-numbers">
          <span
            v-for="(_, index) in codeLines"
            :key="index"
            class="oi-code-line-number"
          >
            {{ index + 1 }}
          </span>
        </div>
        
        <pre class="oi-code-content"><code class="oi-code-text" :data-language="language"><slot>{{ code }}</slot></code></pre>
      </div>
    </template>
    
    <template v-else>
      <pre class="oi-code-content"><code class="oi-code-text" :data-language="language"><slot>{{ code }}</slot></code></pre>
    </template>
  </div>
</template>


