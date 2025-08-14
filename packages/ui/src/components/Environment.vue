<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export interface EnvironmentProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Environment variables to detect
   */
  detect?: ('browser' | 'node' | 'mobile' | 'desktop' | 'touchscreen')[]
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'minimal' | 'detailed'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<EnvironmentProps>(), {
  themeClasses: '',
  detect: () => ['browser', 'mobile', 'touchscreen'],
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  detected: [environment: Record<string, boolean>]
}>()

const environment = ref<Record<string, boolean>>({})

/**
 * Generate environment classes for theme system
 */
const environmentClasses = computed(() => {
  const classes = ['oi-environment']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-environment--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-environment--${props.size}`)
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Detect environment properties
 */
const detectEnvironment = () => {
  const env: Record<string, boolean> = {}
  
  if (props.detect.includes('browser')) {
    env.browser = typeof window !== 'undefined'
  }
  
  if (props.detect.includes('node')) {
    env.node = typeof window === 'undefined'
  }
  
  if (props.detect.includes('mobile')) {
    env.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent || '')
  }
  
  if (props.detect.includes('desktop')) {
    env.desktop = !env.mobile && typeof window !== 'undefined'
  }
  
  if (props.detect.includes('touchscreen')) {
    env.touchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }
  
  environment.value = env
  emit('detected', env)
}

onMounted(() => {
  detectEnvironment()
})
</script>

<template>
  <div
    :class="environmentClasses"
  >
    <div class="oi-environment-data">
      <div 
        v-for="(value, key) in environment" 
        :key="key"
        class="oi-environment-item"
      >
        <span class="oi-environment-key">{{ key }}:</span>
        <span class="oi-environment-value">{{ value }}</span>
      </div>
    </div>
    
    <!-- Default slot for custom content -->
    <slot :environment="environment" />
  </div>
</template>


