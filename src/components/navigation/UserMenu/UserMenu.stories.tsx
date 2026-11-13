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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Account' }));

    const page = within(canvasElement.ownerDocument.body);
    const menuItems = await page.findAllByRole('menuitem');

    await expect(menuItems).toHaveLength(4);
    for (const menuItem of menuItems) {
      await expect(menuItem).toHaveAttribute(
        'href',
        'https://github.com/orgs/deathlabs/',
      );
    }

    await expect(page.getByRole('menuitem', { name: 'User guide' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Developer guide' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Submit feedback' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Contact us' })).toBeVisible();
  },
};

export const CustomLinks: Story = {
  args: {
    contactUsHref: '/contact',
    developerGuideHref: '/developer-guide',
    submitFeedbackHref: '/feedback',
    userGuideHref: '/user-guide',
  },
};
