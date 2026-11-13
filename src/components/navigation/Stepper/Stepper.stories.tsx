import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stepper } from './Stepper';

const meta = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    activeStep: 1,
    children: ['Account', 'Profile', 'Complete'].map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    )),
  },
};
