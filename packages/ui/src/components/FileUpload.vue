<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
import { computed } from 'vue'

export interface FileUploadProps {
  /**
   * Theme classes to apply from the current theme
   */
  themeClasses?: string
  
  /**
   * Accepted file types
   */
  accept?: Record<string, string[]>
  
  /**
   * Maximum number of files
   */
  maxFiles?: number
  
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number
  
  /**
   * Allow multiple files
   */
  multiple?: boolean
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Directory upload
   */
  directory?: boolean
  
  /**
   * Size variant (semantic for theme system)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Variant (semantic for theme system)
   */
  variant?: 'default' | 'bordered' | 'dashed'
  
  /**
   * Additional CSS classes
   */
  customClasses?: string
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  themeClasses: '',
  accept: () => ({}),
  maxFiles: 1,
  maxFileSize: undefined,
  multiple: false,
  disabled: false,
  directory: false,
  size: 'md',
  variant: 'default',
  customClasses: ''
})

const emit = defineEmits<{
  'files-change': [details: { acceptedFiles: File[]; rejectedFiles: File[] }]
  'file-accept': [details: { file: File }]
  'file-reject': [details: { file: File; errors: string[] }]
}>()

/**
 * Generate file upload classes for theme system
 */
const fileUploadClasses = computed(() => {
  const classes = ['oi-file-upload']
  
  if (props.themeClasses) {
    classes.push(props.themeClasses)
  } else {
    classes.push(`oi-file-upload--${props.variant}`)
  }
  
  // Add size class for theme system to handle
  classes.push(`oi-file-upload--${props.size}`)
  
  if (props.disabled) {
    classes.push('oi-file-upload--disabled')
  }
  
  if (props.multiple) {
    classes.push('oi-file-upload--multiple')
  }
  
  if (props.customClasses) {
    classes.push(props.customClasses)
  }
  
  return classes
})

/**
 * Handle files change
 */
const handleFilesChange = (details: { acceptedFiles: File[]; rejectedFiles: File[] }) => {
  emit('files-change', details)
}

/**
 * Handle file accept
 */
const handleFileAccept = (details: any) => {
  emit('file-accept', details)
}

/**
 * Handle file reject
 */
const handleFileReject = (details: any) => {
  emit('file-reject', details)
}
</script>

<template>
  <FileUpload.Root
    :class="fileUploadClasses"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxFileSize"
    :multiple="multiple"
    :disabled="disabled"
    :directory="directory"
    @files-change="handleFilesChange"
    @file-accept="handleFileAccept"
    @file-reject="handleFileReject"
  >
    <FileUpload.Label v-if="$slots.label" class="oi-file-upload-label">
      <slot name="label" />
    </FileUpload.Label>
    
    <FileUpload.Dropzone class="oi-file-upload-dropzone">
      <FileUpload.Trigger class="oi-file-upload-trigger">
        <slot name="trigger">
          <div class="oi-file-upload-trigger-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-file-upload-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div class="oi-file-upload-text">
              <span class="oi-file-upload-title">Click to upload</span>
              <span class="oi-file-upload-subtitle">or drag and drop</span>
            </div>
          </div>
        </slot>
      </FileUpload.Trigger>
    </FileUpload.Dropzone>
    
    <FileUpload.HiddenInput />
    
    <FileUpload.ItemGroup class="oi-file-upload-item-group">
      <FileUpload.Context>
        <template #default="{ acceptedFiles }">
          <FileUpload.Item
            v-for="file in acceptedFiles"
            :key="file.name"
            :file="file"
            class="oi-file-upload-item"
          >
            <FileUpload.ItemPreview class="oi-file-upload-item-preview">
              <FileUpload.ItemName class="oi-file-upload-item-name">
                {{ file.name }}
              </FileUpload.ItemName>
              <FileUpload.ItemSizeText class="oi-file-upload-item-size">
                {{ Math.round(file.size / 1024) }} KB
              </FileUpload.ItemSizeText>
            </FileUpload.ItemPreview>
            
            <FileUpload.ItemDeleteTrigger class="oi-file-upload-item-delete">
              <slot name="deleteIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="oi-file-upload-delete-icon">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </slot>
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        </template>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
</template>


