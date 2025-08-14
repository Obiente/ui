<script setup lang="ts">
import { Timer } from '@ark-ui/vue/timer'
import { computed } from 'vue'

export interface TimerProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Starting time in milliseconds
   */
  startMs?: number
  
  /**
   * Target time in milliseconds (minimum count for countdown)
   */
  targetMs?: number
  
  /**
   * Whether the timer should countdown, decrementing the timer on each tick
   */
  countdown?: boolean
  
  /**
   * Whether the timer should start automatically
   */
  autoStart?: boolean
  
  /**
   * The interval in milliseconds to update the timer count
   */
  interval?: number
  
  /**
   * The unique identifier of the machine
   */
  id?: string
  
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

const props = withDefaults(defineProps<TimerProps>(), {
  themeClasses: '',
  startMs: 0,
  countdown: false,
  autoStart: false,
  interval: 250,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  complete: []
  tick: [details: any]
}>()

/**
 * Generate timer classes for theme system
 */
const timerClasses = computed(() => {
  const baseClass = 'oi-timer'
  
  if (props.themeClasses) {
    return props.themeClasses
  }
  
  const classes = [baseClass]
  
  // Add variant class for theme system to handle
  classes.push(`${baseClass}--${props.variant}`)
  
  // Add size class for theme system to handle
  classes.push(`${baseClass}--${props.size}`)
  
  // Add countdown/countup modifier class
  if (props.countdown) {
    classes.push(`${baseClass}--countdown`)
  } else {
    classes.push(`${baseClass}--countup`)
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes.join(' ')
})
</script>

<template>
  <Timer.Root 
    v-bind="$attrs"
    :class="timerClasses"
    :start-ms="startMs"
    :target-ms="targetMs"
    :countdown="countdown" 
    :auto-start="autoStart"
    :interval="interval"
    @complete="emit('complete')"
    @tick="emit('tick', $event)"
  >
    <Timer.Context>
      <template #default="context">
        <div v-if="$slots.display" :class="`${timerClasses}__display`">
          <slot 
            name="display" 
            v-bind="context"
          />
        </div>
        
        <div v-else :class="`${timerClasses}__display`">
          <Timer.Item type="days" :class="`${timerClasses}__item`">
            {{ context.formattedTime.days }}
            <Timer.Separator v-if="context.formattedTime.days !== '00'" :class="`${timerClasses}__separator`">:</Timer.Separator>
          </Timer.Item>
          
          <Timer.Item type="hours" :class="`${timerClasses}__item`">
            {{ context.formattedTime.hours }}
            <Timer.Separator :class="`${timerClasses}__separator`">:</Timer.Separator>
          </Timer.Item>
          
          <Timer.Item type="minutes" :class="`${timerClasses}__item`">
            {{ context.formattedTime.minutes }}
            <Timer.Separator :class="`${timerClasses}__separator`">:</Timer.Separator>
          </Timer.Item>
          
          <Timer.Item type="seconds" :class="`${timerClasses}__item`">
            {{ context.formattedTime.seconds }}
          </Timer.Item>
        </div>
        
        <div v-if="$slots.controls" :class="`${timerClasses}__controls`">
          <slot 
            name="controls"
            v-bind="context"
          />
        </div>
        
        <div v-else :class="`${timerClasses}__controls`">
          <Timer.ActionTrigger action="start" :class="`${timerClasses}__action-trigger`">
            <slot name="startIcon">Start</slot>
          </Timer.ActionTrigger>
          
          <Timer.ActionTrigger action="pause" :class="`${timerClasses}__action-trigger`">
            <slot name="pauseIcon">Pause</slot>
          </Timer.ActionTrigger>
          
          <Timer.ActionTrigger action="resume" :class="`${timerClasses}__action-trigger`">
            <slot name="resumeIcon">Resume</slot>
          </Timer.ActionTrigger>
          
          <Timer.ActionTrigger action="reset" :class="`${timerClasses}__action-trigger`">
            <slot name="resetIcon">Reset</slot>
          </Timer.ActionTrigger>
        </div>
      </template>
    </Timer.Context>
  </Timer.Root>
</template>


