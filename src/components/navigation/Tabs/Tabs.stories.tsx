import Tab from '@mui/material/Tab';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <Tab key="overview" label="Overview" />,
      <Tab key="activity" label="Activity" />,
      <Tab key="settings" label="Settings" />,
    ],
    value: 0,
  },
};
