import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from './Card';

const meta = {
  title: 'Components/Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <CardActionArea>
          <CardHeader subheader="Updated today" title="Design system" />
          <CardMedia
            component="div"
            sx={{
              background: 'linear-gradient(135deg, #4D1E4A, #E057C9)',
              height: 140,
            }}
          />
          <CardContent>
            <Typography color="text.secondary">
              Build consistent deathlabs applications with reusable components.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>Learn more</Button>
          <Button variant="contained">Open</Button>
        </CardActions>
      </>
    ),
    sx: { maxWidth: 400 },
  },
};
