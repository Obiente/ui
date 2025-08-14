import type { Component } from 'vue';

export interface ExampleComponent {
  template: string;
  script?: string;
  style?: string;
  imports?: Record<string, Component>;
  data?: Record<string, any>;
}

export interface LiveExample {
  id: string;
  title: string;
  description: string;
  component: ExampleComponent;
  props?: Record<string, any>;
}

export interface ComponentRenderer {
  render: (example: LiveExample) => Promise<Component>;
  getExampleData: (id: string) => any;
  updateExampleData: (id: string, data: any) => void;
}
