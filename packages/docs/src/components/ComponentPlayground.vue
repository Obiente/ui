<template>
  <div class="comprehensive-playground space-y-8">
    <!-- Theme Selector -->
    <div class="theme-selector p-4 border rounded-lg">
      <h3 class="text-lg font-semibold mb-4">🎨 Theme Selector</h3>
      <div class="flex gap-4 flex-wrap">
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="catppuccin-mocha"
            class="radio"
          />
          <span>Catppuccin Mocha</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="catppuccin-latte"
            class="radio"
          />
          <span>Catppuccin Latte</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="catppuccin-frappe"
            class="radio"
          />
          <span>Catppuccin Frappe</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="catppuccin-macchiato"
            class="radio"
          />
          <span>Catppuccin Macchiato</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="github"
            class="radio"
          />
          <span>GitHub</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="radio" 
            v-model="selectedTheme" 
            value="fallback"
            class="radio"
          />
          <span>Fallback Styles</span>
        </label>
      </div>
    </div>

    <!-- Buttons Section -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">🔘 Buttons</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button :theme-classes="getButtonTheme('primary')">Primary</Button>
        <Button :theme-classes="getButtonTheme('secondary')">Secondary</Button>
        <Button state="disabled" disabled>Disabled</Button>
        <Button :theme-classes="getButtonTheme('primary')" @click="showModal = true">Open Modal</Button>
      </div>
    </section>

    <!-- Form Controls Section -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">📝 Form Controls</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Input</label>
            <Input 
              :theme-classes="getInputTheme()" 
              placeholder="Enter text..."
              v-model="inputValue"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Textarea</label>
            <Textarea 
              :theme-classes="getTextareaTheme()" 
              placeholder="Enter longer text..."
              v-model="textareaValue"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Select</label>
            <Select :theme-classes="getSelectTheme()" v-model="selectValue">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Checkbox</label>
            <Checkbox 
              :theme-classes="getCheckboxTheme()"
              :label-theme-classes="getCheckboxLabelTheme()"
              :text-theme-classes="getCheckboxTextTheme()"
              v-model="checkboxValue"
            >
              I agree to the terms
            </Checkbox>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Radio Group</label>
            <RadioGroup 
              :options="radioOptions"
              :theme-classes="getRadioTheme()"
              :label-theme-classes="getRadioLabelTheme()"
              :text-theme-classes="getRadioTextTheme()"
              :container-theme-classes="getRadioContainerTheme()"
              name="radio-demo"
              v-model="radioValue"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Switch</label>
            <div class="flex items-center space-x-3">
              <Switch 
                :theme-classes="getSwitchTheme()"
                :knob-theme-classes="getSwitchKnobTheme()"
                v-model="switchValue"
              />
              <span class="text-sm">{{ switchValue ? 'On' : 'Off' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges Section -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">🏷️ Badges</h3>
      <div class="flex flex-wrap gap-3">
        <Badge :theme-classes="getBadgeTheme('primary')">Primary</Badge>
        <Badge :theme-classes="getBadgeTheme('secondary')">Secondary</Badge>
        <Badge :theme-classes="getBadgeTheme('success')">Success</Badge>
        <Badge :theme-classes="getBadgeTheme('warning')">Warning</Badge>
        <Badge :theme-classes="getBadgeTheme('error')">Error</Badge>
      </div>
    </section>

    <!-- Alerts Section -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">⚠️ Alerts</h3>
      <div class="space-y-4">
        <Alert 
          variant="info"
          title="Information"
          :theme-classes="getAlertTheme('info')"
          :icon-theme-classes="getAlertIconTheme('info')"
          :title-theme-classes="getAlertTitleTheme()"
          :message-theme-classes="getAlertMessageTheme()"
        >
          This is an informational alert with some details.
        </Alert>
        
        <Alert 
          variant="success"
          title="Success"
          dismissible
          :theme-classes="getAlertTheme('success')"
          :icon-theme-classes="getAlertIconTheme('success')"
          :title-theme-classes="getAlertTitleTheme()"
          :message-theme-classes="getAlertMessageTheme()"
          :dismiss-theme-classes="getAlertDismissTheme()"
          @dismiss="() => {}"
        >
          Your action was completed successfully!
        </Alert>
        
        <Alert 
          variant="warning"
          title="Warning"
          :theme-classes="getAlertTheme('warning')"
          :icon-theme-classes="getAlertIconTheme('warning')"
          :title-theme-classes="getAlertTitleTheme()"
          :message-theme-classes="getAlertMessageTheme()"
        >
          Please review this warning before continuing.
        </Alert>
        
        <Alert 
          variant="error"
          title="Error"
          :theme-classes="getAlertTheme('error')"
          :icon-theme-classes="getAlertIconTheme('error')"
          :title-theme-classes="getAlertTitleTheme()"
          :message-theme-classes="getAlertMessageTheme()"
        >
          An error occurred while processing your request.
        </Alert>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">🃏 Cards</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <Card :theme-classes="getCardTheme()">
          <template #header>
            <div :class="getCardHeaderTheme()">
              <h4 :class="getCardTitleTheme()">Card Title</h4>
              <p :class="getCardDescriptionTheme()">This is a card description</p>
            </div>
          </template>
          
          <div :class="getCardContentTheme()">
            <p>This is the main content of the card. You can put any content here.</p>
          </div>
          
          <template #footer>
            <div :class="getCardFooterTheme()">
              <Button :theme-classes="getButtonTheme('primary')" size="sm">Action</Button>
              <Button :theme-classes="getButtonTheme('secondary')" size="sm">Cancel</Button>
            </div>
          </template>
        </Card>
        
        <Card :theme-classes="getCardTheme()">
          <div :class="getCardContentTheme()">
            <h4 :class="getCardTitleTheme()">Simple Card</h4>
            <p class="mt-2">A simple card without header or footer.</p>
            <div class="mt-4">
              <Badge :theme-classes="getBadgeTheme('primary')">Featured</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="component-section">
      <h3 class="text-lg font-semibold mb-4">🎮 Interactive Demo</h3>
      <Card :theme-classes="getCardTheme()">
        <div :class="getCardContentTheme()">
          <h4 :class="getCardTitleTheme()">Form Example</h4>
          <div class="mt-4 space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <Input 
                  :theme-classes="getInputTheme()" 
                  placeholder="Your name"
                  v-model="demoForm.name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <Input 
                  :theme-classes="getInputTheme()" 
                  type="email"
                  placeholder="your@email.com"
                  v-model="demoForm.email"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Message</label>
              <Textarea 
                :theme-classes="getTextareaTheme()" 
                placeholder="Your message..."
                v-model="demoForm.message"
              />
            </div>
            
            <div class="flex items-center space-x-4">
              <Checkbox 
                :theme-classes="getCheckboxTheme()"
                :label-theme-classes="getCheckboxLabelTheme()"
                :text-theme-classes="getCheckboxTextTheme()"
                v-model="demoForm.newsletter"
              >
                Subscribe to newsletter
              </Checkbox>
              
              <div class="flex items-center space-x-2">
                <span class="text-sm">Notifications:</span>
                <Switch 
                  :theme-classes="getSwitchTheme()"
                  :knob-theme-classes="getSwitchKnobTheme()"
                  v-model="demoForm.notifications"
                />
              </div>
            </div>
            
            <div class="flex space-x-3">
              <Button :theme-classes="getButtonTheme('primary')" @click="submitDemo">
                Submit
              </Button>
              <Button :theme-classes="getButtonTheme('secondary')" @click="resetDemo">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- Modal -->
    <Modal 
      v-model="showModal"
      title="Example Modal"
      :overlay-theme-classes="getModalOverlayTheme()"
      :theme-classes="getModalTheme()"
      :header-theme-classes="getModalHeaderTheme()"
      :title-theme-classes="getModalTitleTheme()"
      :body-theme-classes="getModalBodyTheme()"
      :footer-theme-classes="getModalFooterTheme()"
      :close-button-theme-classes="getModalCloseTheme()"
    >
      <p>This is an example modal dialog. It demonstrates the modal component with theming support.</p>
      
      <div class="mt-4 space-y-3">
        <Input 
          :theme-classes="getInputTheme()" 
          placeholder="Modal input example"
        />
        <Checkbox 
          :theme-classes="getCheckboxTheme()"
          :label-theme-classes="getCheckboxLabelTheme()"
          :text-theme-classes="getCheckboxTextTheme()"
        >
          Modal checkbox example
        </Checkbox>
      </div>
      
      <template #footer>
        <Button :theme-classes="getButtonTheme('secondary')" @click="showModal = false">
          Cancel
        </Button>
        <Button :theme-classes="getButtonTheme('primary')" @click="showModal = false">
          Confirm
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Button, Input, Card, Textarea, Select, Checkbox, 
  RadioGroup, Switch, Badge, Alert, Modal 
} from '../../../ui/src/index'

// Reactive state
const selectedTheme = ref('catppuccin-mocha')
const inputValue = ref('')
const textareaValue = ref('')
const selectValue = ref('')
const checkboxValue = ref(false)
const radioValue = ref('')
const switchValue = ref(false)
const showModal = ref(false)

// Radio options
const radioOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

// Demo form
const demoForm = ref({
  name: '',
  email: '',
  message: '',
  newsletter: false,
  notifications: true
})

// Theme helper functions
const useTheme = (component: string, variant: string = 'default') => {
  if (selectedTheme.value === 'catppuccin-mocha') {
    return `ctp-mocha-${component}${variant !== 'default' ? `-${variant}` : ''}`
  } else if (selectedTheme.value === 'catppuccin-latte') {
    return `ctp-latte-${component}${variant !== 'default' ? `-${variant}` : ''}`
  } else if (selectedTheme.value === 'catppuccin-frappe') {
    return `ctp-frappe-${component}${variant !== 'default' ? `-${variant}` : ''}`
  } else if (selectedTheme.value === 'catppuccin-macchiato') {
    return `ctp-macchiato-${component}${variant !== 'default' ? `-${variant}` : ''}`
  } else if (selectedTheme.value === 'github') {
    return `github-${component}${variant !== 'default' ? `-${variant}` : ''}`
  }
  return '' // Return empty string for fallback styles
}

// Button themes
const getButtonTheme = (variant: string) => useTheme('btn', variant)

// Input themes
const getInputTheme = () => useTheme('input')
const getTextareaTheme = () => useTheme('textarea')
const getSelectTheme = () => useTheme('select')

// Checkbox themes
const getCheckboxTheme = () => useTheme('checkbox')
const getCheckboxLabelTheme = () => useTheme('checkbox-label')
const getCheckboxTextTheme = () => useTheme('checkbox-text')

// Radio themes
const getRadioTheme = () => useTheme('radio')
const getRadioLabelTheme = () => useTheme('radio-label')
const getRadioTextTheme = () => useTheme('radio-text')
const getRadioContainerTheme = () => useTheme('radio-container')

// Switch themes
const getSwitchTheme = () => useTheme('switch')
const getSwitchKnobTheme = () => useTheme('switch-knob')

// Badge themes
const getBadgeTheme = (variant: string) => useTheme('badge', variant)

// Alert themes
const getAlertTheme = (variant: string) => useTheme('alert', variant)
const getAlertIconTheme = (variant: string) => useTheme('alert-icon', variant === 'info' ? '' : variant)
const getAlertTitleTheme = () => useTheme('alert-title')
const getAlertMessageTheme = () => useTheme('alert-message')
const getAlertDismissTheme = () => useTheme('alert-dismiss')

// Modal themes
const getModalOverlayTheme = () => useTheme('modal-overlay')
const getModalTheme = () => useTheme('modal')
const getModalHeaderTheme = () => useTheme('modal-header')
const getModalTitleTheme = () => useTheme('modal-title')
const getModalBodyTheme = () => useTheme('modal-body')
const getModalFooterTheme = () => useTheme('modal-footer')
const getModalCloseTheme = () => useTheme('modal-close')

// Card themes
const getCardTheme = () => useTheme('card')
const getCardHeaderTheme = () => useTheme('card-header')
const getCardTitleTheme = () => useTheme('card-title')
const getCardDescriptionTheme = () => useTheme('card-description')
const getCardContentTheme = () => useTheme('card-content')
const getCardFooterTheme = () => useTheme('card-footer')

// Demo functions
const submitDemo = () => {
  alert(`Form submitted!\nName: ${demoForm.value.name}\nEmail: ${demoForm.value.email}`)
}

const resetDemo = () => {
  demoForm.value = {
    name: '',
    email: '',
    message: '',
    newsletter: false,
    notifications: true
  }
}
</script>

<style scoped>
.comprehensive-playground {
  max-width: 100%;
}

.component-section {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #ffffff;
}

.theme-selector {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
}

/* Dark mode for Catppuccin */
.comprehensive-playground:has([value="catppuccin-mocha"]:checked) .component-section {
  background: var(--ctp-mocha-surface0, #313244);
  border-color: var(--ctp-mocha-surface1, #45475a);
  color: var(--ctp-mocha-text, #cdd6f4);
}

.comprehensive-playground:has([value="catppuccin-mocha"]:checked) .theme-selector {
  background: var(--ctp-mocha-surface0, #313244);
  border-color: var(--ctp-mocha-surface1, #45475a);
  color: var(--ctp-mocha-text, #cdd6f4);
}

/* Light mode for Catppuccin Latte */
.comprehensive-playground:has([value="catppuccin-latte"]:checked) .component-section {
  background: var(--ctp-latte-surface0, #eff1f5);
  border-color: var(--ctp-latte-surface1, #e6e9ef);
  color: var(--ctp-latte-text, #4c4f69);
}

.comprehensive-playground:has([value="catppuccin-latte"]:checked) .theme-selector {
  background: var(--ctp-latte-surface0, #eff1f5);
  border-color: var(--ctp-latte-surface1, #e6e9ef);
  color: var(--ctp-latte-text, #4c4f69);
}

/* Dark mode for Catppuccin Frappe */
.comprehensive-playground:has([value="catppuccin-frappe"]:checked) .component-section {
  background: var(--ctp-frappe-surface0, #414559);
  border-color: var(--ctp-frappe-surface1, #51576d);
  color: var(--ctp-frappe-text, #c6d0f5);
}

.comprehensive-playground:has([value="catppuccin-frappe"]:checked) .theme-selector {
  background: var(--ctp-frappe-surface0, #414559);
  border-color: var(--ctp-frappe-surface1, #51576d);
  color: var(--ctp-frappe-text, #c6d0f5);
}

/* Dark mode for Catppuccin Macchiato */
.comprehensive-playground:has([value="catppuccin-macchiato"]:checked) .component-section {
  background: var(--ctp-macchiato-surface0, #363a4f);
  border-color: var(--ctp-macchiato-surface1, #494d64);
  color: var(--ctp-macchiato-text, #cad3f5);
}

.comprehensive-playground:has([value="catppuccin-macchiato"]:checked) .theme-selector {
  background: var(--ctp-macchiato-surface0, #363a4f);
  border-color: var(--ctp-macchiato-surface1, #494d64);
  color: var(--ctp-macchiato-text, #cad3f5);
}
</style>
