<script setup lang="ts">
import { computed } from 'vue'

export interface KbdProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Key combinations
   */
  keys?: string[]
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'outlined' | 'filled'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<KbdProps>(), {
  themeClasses: '',
  keys: () => [],
  size: 'md',
  variant: 'default',
  customClasses: ''
})

/**
 * Generate kbd classes for theme system
 */
const kbdClasses = computed(() => {
  const classes = ['oi-kbd']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-kbd--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-kbd--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Normalize key names for display
 */
const normalizeKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    cmd: '⌘',
    ctrl: 'Ctrl',
    alt: '⌥',
    shift: '⇧',
    enter: '↵',
    tab: '⇥',
    space: '␣',
    esc: 'Esc',
    backspace: '⌫',
    delete: '⌦',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→'
  }
  
  return keyMap[key.toLowerCase()] || key
}
</script>

<template>
  <span :class="kbdClasses">
    <template v-if="keys.length > 0">
      <kbd
        v-for="(key, index) in keys"
        :key="index"
        class="oi-kbd-key"
      >
        {{ normalizeKey(key) }}
      </kbd>
      <span v-if="index < keys.length - 1" class="oi-kbd-separator">+</span>
    </template>
    
    <template v-else>
      <kbd class="oi-kbd-key">
        <slot />
      </kbd>
    </template>
  </span>
</template>


