---
layout: "../layouts/Layout.astro"
title: "Layout Components"
---

# Layout Components

Obiente UI provides a set of flexible layout components to help you create responsive, well-structured interfaces.

## Container

The Container component provides a responsive, centered wrapper with maximum width constraints.

```vue
<Container size="md">
  Your content here
</Container>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Maximum width of the container |
| `fluid` | `boolean` | `false` | If true, the container will take full width |

## Grid

The Grid component provides a responsive grid layout system using CSS Grid.

```vue
<Grid :columns="{ base: 1, md: 2, lg: 3 }" :gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| ResponsiveValue<number> \| Record<string, number>` | `1` | Number of columns |
| `gap` | `number \| GapObject \| ResponsiveValue<number \| GapObject>` | `0` | Gap between grid items |

## Flex

The Flex component provides a flexible layout using CSS flexbox.

```vue
<Flex justify="between" align="center" :gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | Direction of flex items |
| `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` | Whether flex items should wrap |
| `justify` | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Horizontal alignment |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | Vertical alignment |
| `gap` | `number \| { x?: number, y?: number }` | `0` | Gap between flex items |

## Stack

The Stack component is a specialized flex container for stacking elements with consistent spacing.

```vue
<Stack :spacing="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction |
| `spacing` | `number` | `0` | Space between items (in rem) |
| `align` | `'start' \| 'end' \| 'center' \| 'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'end' \| 'center' \| 'between'` | `'start'` | Main-axis alignment |

## Spacer

The Spacer component adds flexible or fixed space between elements.

```vue
<Flex>
  <div>Left</div>
  <Spacer grow />
  <div>Right</div>
</Flex>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | - | Fixed width (in rem or CSS value) |
| `height` | `number \| string` | - | Fixed height (in rem or CSS value) |
| `size` | `number \| string` | - | Shorthand for both width and height |
| `grow` | `boolean` | `false` | If true, takes up all available space |
