// Simple Button component for docs demo
export const Button = {
  name: 'Button',
  props: {
    themeClasses: String
  },
  template: `
    <button :class="themeClasses">
      <slot />
    </button>
  `
}

// Simple Input component for docs demo  
export const Input = {
  name: 'Input',
  props: {
    themeClasses: String,
    placeholder: String,
    value: String
  },
  template: `
    <input 
      :class="themeClasses" 
      :placeholder="placeholder"
      :value="value"
    />
  `
}

// Simple Card component for docs demo
export const Card = {
  name: 'Card', 
  props: {
    themeClasses: String
  },
  template: `
    <div :class="themeClasses">
      <slot />
    </div>
  `
}

// Simple Container component for docs demo
export const Container = {
  name: 'Container',
  props: {
    themeClasses: String,
    size: {
      type: String,
      default: 'lg'
    },
    fluid: Boolean
  },
  template: `
    <div :class="['ob-container', themeClasses, fluid ? 'ob-container-fluid' : '', size ? \`ob-container-\${size}\` : '']">
      <slot />
    </div>
  `
}

// Simple Grid component for docs demo
export const Grid = {
  name: 'Grid',
  props: {
    themeClasses: String,
    columns: [Number, Object],
    gap: [Number, Object]
  },
  template: `
    <div 
      :class="['ob-grid', themeClasses]"
      :style="{
        '--grid-columns': typeof columns === 'number' ? columns : 1,
        '--grid-gap': typeof gap === 'number' ? gap + 'rem' : '0'
      }"
    >
      <slot />
    </div>
  `
}

// Simple Flex component for docs demo
export const Flex = {
  name: 'Flex',
  props: {
    themeClasses: String,
    direction: String,
    wrap: String,
    justify: String,
    align: String,
    gap: [Number, Object]
  },
  template: `
    <div 
      :class="['ob-flex', themeClasses]"
      :style="{
        'flex-direction': direction,
        'flex-wrap': wrap,
        'justify-content': justify,
        'align-items': align,
        'gap': typeof gap === 'number' ? gap + 'rem' : '0'
      }"
    >
      <slot />
    </div>
  `
}

// Simple Stack component for docs demo
export const Stack = {
  name: 'Stack',
  props: {
    themeClasses: String,
    direction: {
      type: String,
      default: 'vertical'
    },
    spacing: Number,
    align: String,
    justify: String
  },
  template: `
    <div 
      :class="['ob-stack', themeClasses, \`ob-stack-\${direction}\`]"
      :style="{
        '--stack-spacing': spacing + 'rem',
        'align-items': align,
        'justify-content': justify
      }"
    >
      <slot />
    </div>
  `
}

// Simple Spacer component for docs demo
export const Spacer = {
  name: 'Spacer',
  props: {
    themeClasses: String,
    width: [Number, String],
    height: [Number, String],
    size: [Number, String],
    grow: Boolean
  },
  template: `
    <div 
      :class="['ob-spacer', themeClasses]" 
      :style="{
        'width': width ? (typeof width === 'number' ? width + 'rem' : width) : (size ? (typeof size === 'number' ? size + 'rem' : size) : undefined),
        'height': height ? (typeof height === 'number' ? height + 'rem' : height) : (size ? (typeof size === 'number' ? size + 'rem' : size) : undefined),
        'flex-grow': grow ? '1' : undefined
      }"
    ></div>
  `
}
