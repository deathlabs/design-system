import Stack from '@mui/material/Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Classification, ClassificationBanner } from './ClassificationBanner';

const meta = {
  title: 'Components/Layout/ClassificationBanner',
  component: ClassificationBanner,
  tags: ['autodocs'],
  args: {
    type: Classification.UNCLASSIFIED,
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(Classification),
    },
  },
} satisfies Meta<typeof ClassificationBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unclassified: Story = {};

export const CUI: Story = {
  args: { type: Classification.CUI },
};

export const Confidential: Story = {
  args: { type: Classification.CONFIDENTIAL },
};

export const Secret: Story = {
  args: { type: Classification.SECRET },
};

export const TopSecret: Story = {
  args: { type: Classification.TOP_SECRET },
};

export const TopSecretSCI: Story = {
  args: { type: Classification.TOP_SECRET_SCI },
};

export const AllLevels: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: 480 }}>
      {Object.values(Classification).map((classification) => (
        <ClassificationBanner
          key={classification}
          type={classification}
          sx={{ position: 'static', width: '100%' }}
        />
      ))}
    </Stack>
  ),
};
