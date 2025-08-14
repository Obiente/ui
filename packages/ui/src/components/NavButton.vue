<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'obiente-nav-button',
      {
        'obiente-nav-button--active': active,
        'obiente-nav-button--disabled': disabled
      }
    ]"
    :disabled="disabled && !href"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
interface Props {
  /**
   * The text label for the navigation button
   */
  label?: string
  /**
   * Whether the button represents the current/active page
   */
  active?: boolean
  /**
   * Whether the button is disabled
   */
  disabled?: boolean
  /**
   * If provided, renders as an anchor tag
   */
  href?: string
}

defineProps<Props>()

const emit = defineEmits<{
  /**
   * Emitted when the button is clicked
   */
  click: [event: Event]
}>()

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>


