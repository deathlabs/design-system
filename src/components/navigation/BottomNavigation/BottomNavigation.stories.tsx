import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { BottomNavigation } from './BottomNavigation';

const meta = {
  title: 'Components/Navigation/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

function BottomNavigationExample() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_event, nextValue) => setValue(nextValue)}
    >
      <BottomNavigationAction label="Home" />
      <BottomNavigationAction label="Favorites" />
      <BottomNavigationAction label="Profile" />
    </BottomNavigation>
  );
}

export const Basic: Story = {
  render: () => <BottomNavigationExample />,
};
