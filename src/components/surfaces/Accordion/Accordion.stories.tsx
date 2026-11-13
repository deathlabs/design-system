import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from './Accordion';

const meta = {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <AccordionSummary expandIcon={<span aria-hidden="true">+</span>}>
          <Typography>Project settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
            Configure the project before you publish it.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button variant="contained">Save</Button>
        </AccordionActions>
      </>
    ),
    defaultExpanded: true,
    sx: { maxWidth: 560, width: '90vw' },
  },
};
