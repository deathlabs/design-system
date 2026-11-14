import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageContent } from './PageContent';

const meta = {
  title: 'Components/Layout/PageContent',
  component: PageContent,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Typography variant="h4">Dashboard</Typography>,
  },
};
