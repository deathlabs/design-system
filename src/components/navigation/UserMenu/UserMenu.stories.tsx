import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HeadsetIcon from '@mui/icons-material/Headset';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { UserMenu } from './UserMenu';

const meta = {
  title: 'Components/Navigation/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof UserMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { name: 'User guide', href: '/user-guide', icon: <BookIcon /> },
  { name: 'Developer guide', href: '/developer-guide', icon: <CodeIcon /> },
  { name: 'Submit feedback', href: '/feedback', icon: <FeedbackIcon /> },
  { name: 'Contact us', href: '/contact', icon: <HeadsetIcon /> },
];

export const Default: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Account' }));

    const page = within(canvasElement.ownerDocument.body);
    const menuItems = await page.findAllByRole('menuitem');

    await expect(menuItems).toHaveLength(4);
    await expect(
      menuItems.map((menuItem) => menuItem.getAttribute('href')),
    ).toEqual(items.map((item) => item.href));
    await expect(menuItems.map((menuItem) => menuItem.textContent)).toEqual(
      items.map((item) => item.name),
    );
  },
};

export const CustomItems: Story = {
  args: {
    items: [{ name: 'Profile', href: '/profile', icon: <BookIcon /> }],
  },
};
