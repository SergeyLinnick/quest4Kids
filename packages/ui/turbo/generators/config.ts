import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("react-component", {
    description: "Adds a new react component with all necessary files",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{camelCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{camelCase name}}/{{camelCase name}}.module.css",
        template: `.{{camelCase name}} {
  /* Component styles */
}`,
      },
      {
        type: "add",
        path: "src/components/{{camelCase name}}/{{pascalCase name}}.stories.ts",
        template: `import type { Meta, StoryObj } from '@storybook/react';
import { {{pascalCase name}} } from './{{pascalCase name}}';

const meta: Meta<typeof {{pascalCase name}}> = {
  title: 'Components/{{pascalCase name}}',
  component: {{pascalCase name}},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof {{pascalCase name}}>;

export const Default: Story = {
  args: {
    children: 'Default {{pascalCase name}}'
  },
};`,
      },
      {
        type: "add",
        path: "src/components/{{camelCase name}}/{{pascalCase name}}.mdx",
        template: `# {{pascalCase name}}

Description of the {{pascalCase name}} component and its usage.

## Examples

\`\`\`jsx
import { {{pascalCase name}} } from './{{pascalCase name}}';

<{{pascalCase name}}>Content</{{pascalCase name}}>
\`\`\`
`,
      },
      {
        type: "append",
        path: "src/components/index.ts",
        template: `export { {{pascalCase name}} } from './{{camelCase name}}/{{pascalCase name}}';`,
      },
    ],
  });
}
