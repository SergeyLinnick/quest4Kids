import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./ButtonLink";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
  },
};
