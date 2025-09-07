<script setup lang="ts">
  import { Clipboard } from "@ark-ui/vue/clipboard";
  import { computed } from "vue";

  export interface ClipboardProps {
    /**
     * Theme classes to apply from the current theme
     */
    themeClasses?: string;

    /**
     * Value to copy to clipboard
     */
    value?: string;

    /**
     * Timeout for copied state in milliseconds
     */
    timeout?: number;

    /**
     * Size variant (semantic for theme system)
     */
    size?: "sm" | "md" | "lg";

    /**
     * Variant (semantic for theme system)
     */
    variant?: "default" | "outlined" | "ghost";

    /**
     * Additional CSS classes
     */
    customClasses?: string;
  }

  const props = withDefaults(defineProps<ClipboardProps>(), {
    themeClasses: "",
    value: "",
    timeout: 3000,
    size: "md",
    variant: "default",
    customClasses: "",
  });

  const emit = defineEmits<{
    "status-change": [details: { copied: boolean }];
  }>();

  /**
   * Generate clipboard classes for theme system
   */
  const clipboardClasses = computed(() => {
    const classes = ["oi-clipboard"];

    if (props.themeClasses) {
      classes.push(props.themeClasses);
    } else {
      classes.push(`oi-clipboard--${props.variant}`);
    }

    // Add size class for theme system to handle
    classes.push(`oi-clipboard--${props.size}`);

    if (props.customClasses) {
      classes.push(props.customClasses);
    }

    return classes;
  });

  /**
   * Handle status change
   */
  const handleStatusChange = (details: { copied: boolean }) => {
    emit("status-change", details);
  };
</script>

<template>
  <Clipboard.Root
    :class="clipboardClasses"
    :value="value"
    :timeout="timeout"
    @status-change="handleStatusChange"
  >
    <Clipboard.Context>
      <template #default="{ copied }">
        <Clipboard.Label v-if="$slots.label" class="oi-clipboard-label">
          <slot name="label" />
        </Clipboard.Label>

        <Clipboard.Control class="oi-clipboard-control">
          <Clipboard.Input v-if="$slots.input" class="oi-clipboard-input">
            <slot name="input" />
          </Clipboard.Input>

          <Clipboard.Trigger class="oi-clipboard-trigger">
            <slot name="trigger" :copied="copied">
              <span v-if="copied" class="oi-clipboard-text">
                <slot name="copiedText">Copied!</slot>
              </span>
              <span v-else class="oi-clipboard-text">
                <slot name="copyText">Copy</slot>
              </span>

              <svg
                v-if="copied"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="oi-clipboard-icon"
              >
                <polyline points="20,6 9,17 4,12" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="oi-clipboard-icon"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                />
              </svg>
            </slot>
          </Clipboard.Trigger>
        </Clipboard.Control>

        <Clipboard.Indicator
          v-if="$slots.indicator"
          class="oi-clipboard-indicator"
        >
          <slot name="indicator" :copied="copied" />
        </Clipboard.Indicator>
      </template>
    </Clipboard.Context>
  </Clipboard.Root>
</template>
